<template>
  <div>
    <div v-for="home in homes" :key="home.objectID" style="float: left; margin: 10px">
      <HomeCard :home="home" />
    </div>
  </div>
</template>

<script>
import homes from '~/data/homes';

export default {
  head(){
    // adding head tags
    return {
      title: 'Homepage',
      meta: [
        {
          name: 'description',
          content: 'This is the homepage description',
          hid: 'description'
        }
      ]
    }
  },
  data(){
    return {
      homes: homes.slice(0, 3)
    }
  }
}
</script>
