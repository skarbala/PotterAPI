export default {
name: "Modal",
props: ["spell"],

methods: {
close() {
this.$emit("close");
}
}
};
