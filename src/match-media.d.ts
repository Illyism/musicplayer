import Vue from "vue";
import { PluginFunction } from 'vue/types/plugin';

declare module 'vue/types/vue' {
    interface Vue {
        $mq: { string: boolean }
    }
    
    interface VueConstructor {
        $mq: { string: boolean }
    }
}

declare module "vue/types/options" {
    interface ComponentOptions<V extends Vue> {
        mq?: { [key: string]: string }
    }
}