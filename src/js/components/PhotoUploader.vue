<template>
    <div class="photo-uploader">
        <input
                type="file"
                name="file"
                accept="image/*"
                :disabled="isSaving"
                @change="filesChange($event.target.name, $event.target.files[0])"
                class="photo-uploader__input"
        >
        <img
                :src="filename || uploaded ? `/images/${uploaded ? uploaded : filename}` : require('../../images/person.jpeg')"
                class="photo-uploader__image"
        >
    </div>
</template>

<script>
    import axios from 'axios'
    const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3
    export default {
        name: 'photo-uploader',
        data() {
            return {
                uploaded: this.src,
                uploadError: null,
                currentStatus: STATUS_INITIAL
            }
        },
        computed: {
            isInitial() {
                return this.currentStatus === STATUS_INITIAL
            },
            isSaving() {
                return this.currentStatus === STATUS_SAVING
            },
            isSuccess() {
                return this.currentStatus === STATUS_SUCCESS
            },
            isFailed() {
                return this.currentStatus === STATUS_FAILED
            }
        },
        props: {
            filename: String,
            dir: String
        },
        methods: {
            save(formData) {
                this.currentStatus = STATUS_SAVING
                axios.post(
                    `/api/upload`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )
                    .then(res => {
                        if (this.uploaded) {
                            axios.post('/api/files/remove', { filename: this.uploaded })
                        }
                        this.uploaded = res.data[Object.keys(res.data)[0]].replace('/public/images/', '')
                        this.$emit('upload-file', this.uploaded)
                        this.currentStatus = STATUS_SUCCESS
                    })
                    .catch(err => {
                        this.uploadError = err.response
                        this.currentStatus = STATUS_FAILED
                    });
            },
            filesChange(fieldName, file) {
                const formData = new FormData()
                if (!file) return
                formData.append(fieldName, file, file.name)
                this.save(formData)
            }
        },
    }
</script>
