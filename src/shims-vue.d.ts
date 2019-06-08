import { Component } from "vue";

interface SubredditListItem {
  Subreddit: string
  Genre: string
}

interface SortMethod {
  id: string
  image: string
  color: string
}

interface TopSortMethod {
  id: string
  title: string
  color: string
}

declare module '*.vue' {
  import Vue, { PluginFunction } from 'vue';
  export default Vue;
}

declare module 'vue-match-media/src' {
  import { PluginFunction } from 'vue/types/plugin';

  const Meta: PluginFunction<{}>
  export default Meta;
}


declare module 'vue-popperjs' {
  export default Component
}