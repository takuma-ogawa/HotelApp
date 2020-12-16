<template>
    <div>
        <button type="button" class="btn btn-primary" data-toggle="modal" v-bind:data-target="dataTarget" v-bind:ref="name" >
            modal
        </button>
        <div class="modal fade" v-bind:id="name" tabindex="-1" role="dialog" v-bind:aria-labelledby="label" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" v-bind:id="label">{{title}}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" ref="disappear">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                {{confirmMassage}}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">{{closeButtonText}}</button>
                <button type="button" class="btn btn-primary" v-on:click="submit()">{{submitButtonText}}</button>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        name: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        }, 
        confirmMassage: {
            type: String,
            required: true
        },
        closeButtonText: {
            type: String,
            required: true
        },
        submitButtonText: {
            type: String,
            required: true
        }
    },
    computed: {
        dataTarget() {
            return "#" + this.name
        }
    },
    methods: {
        submit() {
            this.$emit('submit')
        },
        appearModal() {
            this.$refs[this.name].click()
        },
        disappearModal() {
            this.$refs.disappear.click()
        }
    }
}
</script>
