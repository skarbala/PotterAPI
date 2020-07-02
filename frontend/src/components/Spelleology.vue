<template>
    <div class="main spells-main">
        <h1 class="text-center title">Spelleology</h1>
        <div class="col-md-12 mx-auto">
            <div class="col-md-6 row mx-auto">
                <search-component class="col" v-model="search"/>
                <div class="col-md-4 unforgivable-checkbox">
                    <input type="checkbox" id="unforgivableOnly" v-model="unforgivableOnly">
                    <label for="unforgivableOnly">Unforgivable only</label>
                </div>
            </div>
            <div class="type-filter">
                <input type="checkbox" id="spell" value="Spell" v-model="checkedSpells">
                <label for="spell">Spell</label>
                <input type="checkbox" id="charm" value="Charm" v-model="checkedSpells">
                <label for="charm">Charm</label>
                <input type="checkbox" id="curse" value="Curse" v-model="checkedSpells">
                <label for="curse">Curse</label>
                <input type="checkbox" id="enchantment" value="Enchantment" v-model="checkedSpells">
                <label for="enchantment">Enchantment</label>
                <input type="checkbox" id="hex" value="Hex" v-model="checkedSpells">
                <label for="hex">Hex</label>
                <input type="checkbox" id="jinx" value="Jinx" v-model="checkedSpells">
                <label for="jinx">Jinx</label>
            </div>
            <div>
                <button v-on:click="clearAll" class="spell-button">Delete all</button>
                <button v-on:click="reset" class="spell-button">Reset</button>
            </div>
            <div class="row col-md-12 mx-auto">
                <h1 class="subtitle text-center mx-auto" v-if="filteredList.length ===0">No magic to show</h1>

                <spell-list v-if="spells.length >=1" :spells="filteredList" v-on:clickOnspell="selectSpell"/>
            </div>
            <h1 class="subtitle text-center" v-if="spells.length ===0">Mischief managed</h1>
            <modal :spell="selectedSpell" v-show="showModal" @close="closeModal"/>
        </div>
    </div>
</template>

<script>
    import SpellList from "./SpellList.vue";
    import SearchComponent from "./SearchComponent.vue";
    import Modal from "./Modal.vue";

    export default {
        name: "Spelleology",
        components: {
            SpellList,
            SearchComponent,
            Modal
        },
        data: function () {
            return {
                spells: [], selectedSpell: "", showModal: false, search: "", unforgivableOnly: false,
                checkedSpells: ['Charm', 'Enchantment', 'Curse', 'Spell', 'Hex', 'Jinx']
            };
        },
        computed: {
            filteredList: function () {
                let spells = this.spells;
                spells = spells.filter(spell => spell.effect.toLowerCase().includes(this.search.toLowerCase()));
                spells = spells.filter(spell => this.checkedSpells.includes(spell.type))
                if (this.unforgivableOnly) {
                    spells = spells.filter(spell => spell.isUnforgivable === true);
                }
                return spells;
            }
        },

        created: function () {
            this.$http.get("/spells").then(response => (this.spells = response.data));
        },
        methods: {
            selectSpell: function (spell) {
                this.selectedSpell = spell;
                this.showModal = true;
            },
            closeModal() {
                this.showModal = false;
            },
            clearAll: function () {
                this.$http
                    .delete("spells/actions/deleteAll")
                    .then(() => (this.spells = []));
            },
            reset: function () {
                this.$http.get("spells/actions/reset").then(response => {
                    this.spells = response.data.spells;
                });
            }
        }
    };
</script>
<style lang="scss" scoped>
    div.spells-main {
        background-color: #822724;
    }

    h1 {
        font-family: "Harry", serif;

        &.title {
            color: white;
            font-size: 8em;
            text-shadow: 7px 7px 2px #671e1c;
        }

        &.subtitle {
            margin: 100px;
            font-size: 6em;
            color: #dca39e;
        }
    }

    label {
        color: white;
        padding: 0 10px;
        font-family: "Kanit", serif;
        font-size: 1.5em;
    }

    div.unforgivable-checkbox {
        padding: 20px 0;

    }


    .spell-button {
        padding: 1px 20px;
        background-color: #822724;
        font-family: "Kanit", serif;
        color: #fffcf9;
        font-size: 2em;
        cursor: pointer;
        border-bottom: 2px solid #dca39e;
        margin: 0 20px;

        &:hover {
            border-bottom: 2px solid white;
            color: white;
        }
    }

    @font-face {
        font-family: "Harry";
        src: url("../assets/HARRYP.TTF");
    }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
