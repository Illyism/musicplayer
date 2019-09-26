import Vue from 'vue'

declare module 'vue/types/vue' {
    interface Vue {
        $mq: { [key: string]: boolean };
    }

    interface VueConstructor {
        $mq: { [key: string]: boolean };
    }
}

declare module 'vue/types/options' {
    interface ComponentOptions< V extends Vue > {
        mq?: { [key: string]: string };
    }
}