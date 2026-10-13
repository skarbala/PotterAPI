<template>
  <div class="houses-page">
    <div class="houses-shell">
      <header class="houses-intro">
        <h1>Houses of Hogwarts</h1>
        <p>Enter your token to open the house rolls.</p>
        <div class="token-field">
          <input
            type="text"
            id="token"
            data-test="houses-token"
            v-model="token"
            placeholder="paste your token"
            autocomplete="off"
          />
        </div>
        <p v-if="loading" class="status-message">Loading houses...</p>
        <p v-if="error" class="error-message">{{ error }}</p>
      </header>

      <ul v-if="houses.length > 0" class="houses-grid">
        <li
          v-for="house in houses"
          :key="house.id"
          class="crest-card"
          :class="houseThemeClass(house)"
          :data-test="'house-' + house.name"
        >
          <div class="crest-panel">
            <div class="vine-pattern" aria-hidden="true"></div>
            <div class="crest-emblem">
              <img
                class="crest-logo"
                :src="houseCrestSrc(house)"
                :alt="house.name + ' crest'"
              />
              <div class="crest-ribbon">
                <span>{{ house.name }}</span>
              </div>
            </div>
          </div>

          <div class="crest-details">
            <p class="motto">{{ house.values.join(" · ") }}</p>
            <div class="meta-grid">
              <p><span>Mascot</span>{{ house.mascot }}</p>
              <p><span>Head</span>{{ house.headOfHouse }}</p>
              <p><span>Ghost</span>{{ house.houseGhost }}</p>
              <p><span>Founder</span>{{ house.founder }}</p>
              <p><span>Colors</span>{{ house.colors.join(", ") }}</p>
              <p><span>Students</span>{{ studentsFor(house).length }}</p>
            </div>

            <div class="students">
              <h4>Students</h4>
              <ul class="student-list">
                <li
                  v-for="student in studentsFor(house)"
                  :key="student.id"
                >
                  {{ student.name }}
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import gryffindorCrest from "../assets/houses/gryffindor.svg";
import slytherinCrest from "../assets/houses/slytherin.svg";
import ravenclawCrest from "../assets/houses/ravenclaw.svg";
import hufflepuffCrest from "../assets/houses/hufflepuff.svg";

export default {
  name: "HousesComponent",
  data() {
    return {
      token: "",
      houses: [],
      error: "",
      loading: false,
      fetchTimeout: null,
      crests: {
        gryffindor: gryffindorCrest,
        slytherin: slytherinCrest,
        ravenclaw: ravenclawCrest,
        hufflepuff: hufflepuffCrest,
      },
    };
  },
  watch: {
    token(newToken) {
      clearTimeout(this.fetchTimeout);
      const trimmedToken = newToken.trim();

      if (!trimmedToken) {
        this.houses = [];
        this.error = "";
        this.loading = false;
        return;
      }

      this.loading = true;
      this.error = "";
      this.fetchTimeout = setTimeout(() => {
        this.loadHouses(trimmedToken);
      }, 300);
    },
  },
  beforeDestroy() {
    clearTimeout(this.fetchTimeout);
  },
  methods: {
    houseKey(house) {
      const name = (house.name || "").toLowerCase();
      if (name.includes("gryffindor")) return "gryffindor";
      if (name.includes("slytherin")) return "slytherin";
      if (name.includes("ravenclaw")) return "ravenclaw";
      if (name.includes("hufflepuff")) return "hufflepuff";
      return "";
    },
    houseThemeClass(house) {
      const key = this.houseKey(house);
      return key ? `house--${key}` : "house--default";
    },
    houseCrestSrc(house) {
      return this.crests[this.houseKey(house)] || "";
    },
    studentsFor(house) {
      if (!house.members || !house.members.length) {
        return [];
      }
      return house.members.filter((member) => {
        if (typeof member === "string") {
          return true;
        }
        const role = (member.role || "").toLowerCase();
        return !role || role === "student";
      });
    },
    loadHouses(token) {
      this.$http
        .get("/houses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.houses = response.data;
          this.error = "";
        })
        .catch((error) => {
          this.houses = [];
          if (error.response && error.response.status === 403) {
            this.error = "Invalid or missing token.";
          } else {
            this.error = "Failed to load houses. Please try again.";
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped lang="scss">
.houses-page {
  min-height: calc(100vh - 56px);
  padding: 3rem 1.25rem 4rem;
  background:
    radial-gradient(circle at top, rgba(255, 255, 255, 0.55), transparent 40%),
    linear-gradient(180deg, #f3ebe0 0%, #e4d5c1 100%);
  color: #2b2118;
  text-align: left;
}

.houses-shell {
  max-width: 1100px;
  margin: 0 auto;
}

.houses-intro {
  max-width: 560px;
  margin-bottom: 2rem;

  h1 {
    margin: 0 0 0.4rem;
    font-family: "Cinzel", serif;
    font-size: clamp(2rem, 4vw, 2.8rem);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #3a2a1c;
  }

  p {
    margin: 0 0 1.25rem;
    font-family: "Cormorant Garamond", serif;
    font-size: 1.25rem;
    font-style: italic;
    color: #6a5540;
  }
}

.token-field input {
  width: 100%;
  border: 1px solid rgba(90, 70, 45, 0.28);
  border-radius: 0;
  background: rgba(255, 252, 246, 0.85);
  box-shadow: 10px 14px 24px rgba(50, 35, 20, 0.08);
  color: #2b2118;
  font-family: "Cormorant Garamond", serif;
  font-size: 1.15rem;
  padding: 0.85rem 1rem;

  &:focus {
    outline: none;
    border-color: #8b6b3e;
    box-shadow: 0 0 0 3px rgba(139, 107, 62, 0.15);
  }
}

.status-message,
.error-message {
  margin: 0.9rem 0 0;
  font-family: "Cormorant Garamond", serif;
  font-size: 1.1rem;
  font-weight: 600;
}

.error-message {
  color: #8a2f2a;
}

.houses-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
}

.crest-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(50, 35, 20, 0.15);
  box-shadow: 0 18px 34px rgba(45, 30, 18, 0.16);
  background: #f3ebe0;
}

.crest-panel {
  position: relative;
  min-height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.2rem 1.5rem 2.6rem;
  overflow: hidden;
}

.vine-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.22;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cpath d='M20 90c20-10 20-30 0-40 20-10 30-30 10-50M60 110c20-10 20-30 0-40 20-10 30-30 10-50M100 90c20-10 20-30 0-40 20-10 30-30 10-50' fill='none' stroke='%23ffffff' stroke-width='3' stroke-linecap='round'/%3E%3C/svg%3E");
  background-size: 120px 120px;
}

.crest-emblem {
  position: relative;
  z-index: 1;
  width: min(100%, 240px);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.crest-logo {
  width: 180px;
  height: auto;
  display: block;
  filter: drop-shadow(0 12px 18px rgba(0, 0, 0, 0.35));
}

.crest-ribbon {
  position: relative;
  z-index: 2;
  margin-top: 0.85rem;
  min-width: 180px;
  padding: 0.55rem 1.4rem 0.65rem;
  background: #f8f4ec;
  color: #1f1710;
  text-align: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.18);
  clip-path: polygon(
    8% 0,
    92% 0,
    100% 50%,
    92% 100%,
    8% 100%,
    0 50%
  );

  span {
    display: block;
    font-family: "Cinzel", serif;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
}

.crest-details {
  flex: 1 1 auto;
  padding: 1.25rem 1.35rem 1.5rem;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.45), transparent 30%),
    #f3ebe0;
  border-top: 1px solid rgba(50, 35, 20, 0.1);
}

.motto {
  margin: 0 0 1rem;
  font-family: "Cormorant Garamond", serif;
  font-size: 1.15rem;
  font-style: italic;
  color: #5c4834;
  text-transform: capitalize;
}

.meta-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.55rem 1rem;
  margin-bottom: 1.1rem;

  p {
    margin: 0;
    font-family: "Cormorant Garamond", serif;
    font-size: 1.05rem;
    color: #2b2118;

    span {
      display: block;
      margin-bottom: 0.1rem;
      font-family: "Cinzel", serif;
      font-size: 0.68rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #7a654c;
    }
  }
}

.students {
  h4 {
    margin: 0 0 0.55rem;
    font-family: "Cinzel", serif;
    font-size: 0.78rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #5a4630;
  }

  .student-list {
    list-style: none;
    margin: 0;
    padding: 0;
    columns: 2;
    column-gap: 1rem;

    li {
      margin-bottom: 0.3rem;
      font-family: "Cormorant Garamond", serif;
      font-size: 1.02rem;
      color: #2b2118;
      break-inside: avoid;
    }
  }
}

.house--gryffindor {
  .crest-panel {
    background: linear-gradient(160deg, #8b1e1e 0%, #5c0d0d 55%, #3d0808 100%);
  }

  .crest-ribbon span {
    color: #6d1212;
  }
}

.house--slytherin {
  .crest-panel {
    background: linear-gradient(160deg, #2f5d3a 0%, #1d3f28 55%, #12291a 100%);
  }

  .crest-ribbon span {
    color: #1d3f28;
  }
}

.house--ravenclaw {
  .crest-panel {
    background: linear-gradient(160deg, #1d2f66 0%, #142247 55%, #0d1730 100%);
  }

  .crest-ribbon span {
    color: #142247;
  }
}

.house--hufflepuff {
  .crest-panel {
    background: linear-gradient(160deg, #e0b33d 0%, #c9951c 55%, #8d6a12 100%);
  }

  .crest-ribbon span {
    color: #2b2118;
  }
}

@media (max-width: 900px) {
  .houses-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .meta-grid,
  .students .student-list {
    columns: 1;
    grid-template-columns: 1fr;
  }

  .crest-panel {
    min-height: 240px;
  }

  .crest-logo {
    width: 140px;
  }
}
</style>
