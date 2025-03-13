<template>
<button @click="onClick()" :style="{background: color}" class="btn {{text}}">
    {{ text }}
</button>
</template>

<script>
export default {
    name: 'Button_C',
    props: {
        text: String,
        color: String
    },
    methods: {
        onClick() {
            this.$emit('btn-click')
        }
    }
}


</script>