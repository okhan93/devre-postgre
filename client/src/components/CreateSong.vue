<template>
    <v-layout>
    <v-flex xs4>
        <panel title="Song Metadata">
            <v-text-field
            class="ml-1 mr-1"
            label="title"
            placeholder="title"
            v-model="song.title"
            box/>
            <v-text-field
            class="ml-1 mr-1"
            label="artist"
            placeholder="artist"
            v-model="song.artist"
            box/>
            <v-text-field
            class="ml-1 mr-1"
            label="genre"
            placeholder="genre"
            v-model="song.genre"
            box/>
            <v-text-field
            class="ml-1 mr-1"
            label="album"
            placeholder="album"
            v-model="song.album"
            box/>
            <v-text-field
            class="ml-1 mr-1"
            label="albumImageUrl"
            placeholder="albumImageUrl"
            v-model="song.albumImageUrl"
            box/>
            <v-text-field
            class="ml-1 mr-1"
            label="youtubeId"
            placeholder="youtubeId"
            v-model="song.youtubeId"
            box/>
        </panel>
    </v-flex>
    <v-flex xs8 ml-2>
        <panel title="Create Song">
            <v-textarea
            class="ml-1 mr-1"
            label="tab"
            placeholder="tab"
            v-model="song.tab"
            box/>
             <v-textarea
            class="ml-1 mr-1"
            label="lyrics"
            placeholder="lyrics"
            v-model="song.lyrics"
            box/>
        </panel>
        <v-btn
        dark
        class="cyan"
        @click="create">
        Create Song
      </v-btn>
    </v-flex>
</v-layout>
</template>

<script>
import Panel from '@/components/panel'
import SongsService from '@/services/SongsService'

export default {
  data () {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImageUrl: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      }
    }
  },
  components: {
    Panel
  },
  methods: {
    async create () {
      try {
        await SongsService.post(this.song)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
