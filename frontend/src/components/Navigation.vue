<template>
  <nav class="navbar navbar-expand-lg">
    <ul class="navbar-nav mx-auto">
      <li class="nav-item">
        <router-link class="nav-link" to="/">Welcome</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/spelleology">Spelleology</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/sortingHat">Sorting Hat</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/quotes">Quote Generator</router-link>
      </li>
    </ul>
  </nav>
</template>  

<script>
export default {
  name: "Navigation"
};
</script>
<style>
a {
  color: #212529;
}
a:hover {
  color: black;
}
a.router-link-exact-active {
  border-bottom: 1px solid #212529;
}
</style>
