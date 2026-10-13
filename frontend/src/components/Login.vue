<template>
  <div class="login-page" :class="{ 'has-token': !!token }">
    <div class="login-stage" aria-hidden="true">
      <img
        class="login-keys"
        src="../assets/flying-keys.png"
        alt=""
      />
      <div class="login-glow"></div>
    </div>

    <div class="login-content">
      <h1>Claim your winged key</h1>
      <p class="lede">
        Present your credentials and the chamber will return a token.
      </p>

      <form class="login-form" @submit.prevent="requestToken">
        <label class="field">
          <span>Login</span>
          <input
            type="text"
            id="login"
            data-test="login"
            v-model="login"
            placeholder="wizard name"
            autocomplete="username"
          />
        </label>
        <label class="field">
          <span>Password</span>
          <input
            type="password"
            id="password"
            data-test="password"
            v-model="password"
            placeholder="secret charm"
            autocomplete="current-password"
          />
        </label>
        <button
          class="submit"
          type="submit"
          data-test="request-token"
          :disabled="loading"
        >
          <span>{{ loading ? "Opening the chamber..." : "Open the chamber" }}</span>
        </button>
      </form>

      <p v-if="error" class="error-message" data-test="login-error">
        {{ error }}
      </p>
    </div>

    <button
      v-if="token"
      type="button"
      class="token-box"
      data-test="token-box"
      :class="{ copied: copied }"
      @click="copyToken"
    >
      <div class="token-header">
        <h2>Your token</h2>
        <span class="copy-hint">{{ copied ? "Copied!" : "Click to copy" }}</span>
      </div>
      <p class="token-value" data-test="token">{{ token }}</p>
    </button>
  </div>
</template>

<script>
export default {
  name: "LoginComponent",
  data() {
    return {
      login: "",
      password: "",
      token: "",
      error: "",
      loading: false,
      copied: false,
      copyTimeout: null,
    };
  },
  beforeDestroy() {
    clearTimeout(this.copyTimeout);
  },
  methods: {
    requestToken() {
      if (!this.login || !this.password) {
        this.error = "Please enter both login and password.";
        this.token = "";
        this.copied = false;
        return;
      }

      this.loading = true;
      this.error = "";
      this.token = "";
      this.copied = false;

      this.$http
        .get("/login", {
          auth: {
            username: this.login,
            password: this.password,
          },
        })
        .then((response) => {
          this.token = response.data.token;
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            this.error = "Invalid login or password.";
          } else {
            this.error = "Failed to obtain token. Please try again.";
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    copyToken() {
      if (!this.token) {
        return;
      }

      const markCopied = () => {
        this.copied = true;
        clearTimeout(this.copyTimeout);
        this.copyTimeout = setTimeout(() => {
          this.copied = false;
        }, 1800);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(this.token)
          .then(markCopied)
          .catch(() => {
            this.fallbackCopyToken(markCopied);
          });
        return;
      }

      this.fallbackCopyToken(markCopied);
    },
    fallbackCopyToken(onSuccess) {
      const input = document.createElement("textarea");
      input.value = this.token;
      input.setAttribute("readonly", "");
      input.style.position = "absolute";
      input.style.left = "-9999px";
      document.body.appendChild(input);
      input.select();

      try {
        document.execCommand("copy");
        onSuccess();
      } catch (error) {
        this.error = "Could not copy token. Please select it manually.";
      }

      document.body.removeChild(input);
    },
  },
};
</script>

<style scoped lang="scss">
.login-page {
  --ink: #2a2118;
  --gold: #b08d57;
  --gold-bright: #d4b07a;
  --cream: #f4efe6;
  --veil: rgba(244, 239, 230, 0.72);

  position: relative;
  min-height: calc(100vh - 56px);
  overflow: hidden;
  background:
    radial-gradient(circle at 70% 30%, rgba(212, 176, 122, 0.28), transparent 40%),
    linear-gradient(135deg, #f7f2ea 0%, #ebe2d4 45%, #d9c7a8 100%);
  color: var(--ink);
  text-align: left;

  &.has-token {
    .login-content {
      padding-bottom: 28vh;
    }
  }
}

.login-stage {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: calc(100vh - 56px);
  pointer-events: none;
}

.login-keys {
  position: absolute;
  left: 52%;
  top: 50%;
  width: min(68vw, 760px);
  transform: translate(-20%, -50%);
  object-fit: contain;
  filter: drop-shadow(18px 28px 24px rgba(42, 33, 24, 0.28));
  animation: key-drift 10s ease-in-out infinite;
}

.login-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    linear-gradient(
      90deg,
      rgba(244, 239, 230, 0.96) 0%,
      rgba(244, 239, 230, 0.82) 28%,
      rgba(244, 239, 230, 0.28) 55%,
      rgba(244, 239, 230, 0.08) 100%
    ),
    radial-gradient(
      ellipse at 58% 48%,
      rgba(255, 255, 255, 0.35),
      transparent 45%
    );
  animation: veil-breathe 8s ease-in-out infinite;
}

.login-content {
  position: relative;
  z-index: 1;
  max-width: 460px;
  padding: 8vh 6vw 10vh;
  animation: rise-in 0.9s ease-out both;
}

h1 {
  margin: 0 0 0.75rem;
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 600;
  line-height: 1.15;
  color: #5a4630;
}

.lede {
  margin: 0 0 2rem;
  max-width: 28ch;
  font-family: "Cormorant Garamond", serif;
  font-size: 1.25rem;
  font-style: italic;
  color: #6d5840;
}

.login-form {
  display: grid;
  gap: 1rem;
}

.field {
  display: grid;
  gap: 0.4rem;

  span {
    font-family: "Cinzel", serif;
    font-size: 0.72rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #7a654c;
  }

  input {
    width: 100%;
    border: 1px solid rgba(176, 141, 87, 0.45);
    border-radius: 0;
    background: rgba(255, 252, 247, 0.55);
    backdrop-filter: blur(6px);
    box-shadow: 12px 16px 28px rgba(42, 33, 24, 0.08);
    color: var(--ink);
    font-family: "Cormorant Garamond", serif;
    font-size: 1.2rem;
    padding: 0.85rem 1rem;
    transition: border-color 0.25s ease, box-shadow 0.25s ease,
      background 0.25s ease;

    &::placeholder {
      color: #a08b70;
    }

    &:focus {
      outline: none;
      border-color: var(--gold);
      background: rgba(255, 252, 247, 0.85);
      box-shadow:
        0 0 0 3px rgba(176, 141, 87, 0.18),
        12px 16px 28px rgba(42, 33, 24, 0.1);
    }
  }
}

.submit {
  margin-top: 0.35rem;
  border: 1px solid #8d6f3e;
  border-radius: 0;
  background: linear-gradient(135deg, #c6a46a 0%, #8f7342 55%, #b08d57 100%);
  background-size: 180% 180%;
  color: #fff8ef;
  font-family: "Cinzel", serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 1rem 1.25rem;
  cursor: pointer;
  box-shadow: 14px 18px 30px rgba(42, 33, 24, 0.18);
  transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
  animation: gold-shift 6s ease-in-out infinite;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    filter: brightness(1.05);
    box-shadow: 16px 22px 34px rgba(42, 33, 24, 0.24);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.error-message {
  margin: 1rem 0 0;
  font-family: "Cormorant Garamond", serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #8a2f2a;
}

.token-box {
  position: fixed;
  left: 6vw;
  right: 6vw;
  bottom: 1.25rem;
  z-index: 5;
  width: auto;
  max-width: 920px;
  margin: 0;
  padding: 1rem 1.25rem;
  border: 1px solid rgba(176, 141, 87, 0.55);
  background: rgba(42, 33, 24, 0.94);
  color: var(--cream);
  text-align: left;
  box-shadow: 16px 22px 36px rgba(42, 33, 24, 0.28);
  cursor: pointer;
  animation: rise-in 0.55s ease-out both;
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: var(--gold-bright);
    transform: translateY(-2px);
  }

  &.copied {
    border-color: var(--gold-bright);
  }

  .token-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 0.55rem;
  }

  h2 {
    margin: 0;
    font-family: "Cinzel", serif;
    font-size: 0.75rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--gold-bright);
  }

  .copy-hint {
    font-family: "Cinzel", serif;
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #cbb89a;
  }

  .token-value {
    margin: 0;
    word-break: break-all;
    font-family: "Cormorant Garamond", serif;
    font-size: 0.95rem;
    line-height: 1.35;
    color: #f7f0e4;
  }
}

@media (min-width: 980px) {
  .token-box {
    left: 6vw;
    right: auto;
    width: min(920px, 88vw);
  }
}

@keyframes key-drift {
  0%,
  100% {
    transform: translate(-20%, -50%) rotate(0deg);
  }
  50% {
    transform: translate(calc(-20% - 10px), calc(-50% - 12px)) rotate(-1.2deg);
  }
}

@keyframes veil-breathe {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.9;
  }
}

@keyframes rise-in {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes gold-shift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@media (max-width: 900px) {
  .login-keys {
    left: 50%;
    width: min(90vw, 640px);
    opacity: 0.55;
    transform: translate(-35%, -50%);
    animation: key-drift-tablet 10s ease-in-out infinite;
  }

  .login-glow {
    background: linear-gradient(
      180deg,
      rgba(244, 239, 230, 0.92) 0%,
      rgba(244, 239, 230, 0.82) 55%,
      rgba(244, 239, 230, 0.55) 100%
    );
  }

  .login-content {
    max-width: 100%;
    padding: 6vh 7vw 8vh;
  }
}

@media (max-width: 600px) {
  .login-keys {
    top: 16%;
    left: 50%;
    width: 110%;
    opacity: 0.7;
    transform: translate(-50%, 0);
    animation: key-drift-mobile 10s ease-in-out infinite;
  }

  .login-content {
    padding-top: 40vh;
  }
}

@keyframes key-drift-tablet {
  0%,
  100% {
    transform: translate(-35%, -50%);
  }
  50% {
    transform: translate(calc(-35% - 8px), calc(-50% - 10px));
  }
}

@keyframes key-drift-mobile {
  0%,
  100% {
    transform: translate(-50%, 0);
  }
  50% {
    transform: translate(-50%, -10px);
  }
}
</style>
