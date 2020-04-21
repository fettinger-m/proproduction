<template>
  <div id="profile">
    <NavBar small-nav></NavBar>
    <h2 class="categorytitle">My Profile</h2>
    <UserProfileComp/>
  </div>
</template>

<script>

import NavBar from "@/components/Layout/NavBar";
import UserProfileComp from "@/pages/UserProfile/UserProfileComp";

export default {
  name: 'profile',
  components: {
    UserProfileComp,
    NavBar,
  }
}
</script>

<style>
</style>
