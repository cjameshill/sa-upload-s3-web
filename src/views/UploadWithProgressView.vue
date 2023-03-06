<script setup lang="ts">
import { ref, computed } from "vue";
import { useFileDialog } from "@vueuse/core";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, S3 } from "@aws-sdk/client-s3";
const { files, open }: any = useFileDialog();
const newKey = ref("");
const uploadResponse: any = ref("");
const loading = ref(false);

const file: any = computed(() =>
  files.value && files.value.length > 0 ? files.value[0] : null
);

const fileType = computed(() => file.value?.type);

const upload = async () => {
  try {
    const params = {
      Bucket: "sa-testing-upload-progress",
      Key: newKey.value,
      Body: file.value,
      ContentType: fileType.value,
    };
    console.log("params: ", params);
    const parallelUploads3 = new Upload({
      client: new S3({}) || new S3Client({}),
      params,

      tags: [
        /*...*/
      ], // optional tags
      queueSize: 4, // optional concurrency configuration
      partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
      leavePartsOnError: false, // optional manually handle dropped parts
    });

    parallelUploads3.on("httpUploadProgress", (progress) => {
      console.log(progress);
    });

    await parallelUploads3.done();
  } catch (error: any) {
    console.log("error uploading: ", error.message);
  }
};
</script>

<template>
  <div
    v-if="loading"
    class="fixed top-0 left-0 bg-white bg-opacity-90 backdrop-blur-lg w-full h-full flex justify-center items-center"
  >
    loading
  </div>

  <div class="flex flex-col w-full lg:w-2/3">
    <input
      v-model="newKey"
      class="p-6 mb-4 mt-2 rounded-3xl border-2 border-gray-300"
      type="text"
      name="key"
      id="key"
      placeholder="New File Name for S3"
    />
    <div class="flex flex-col w-full space-y-8 mt-4">
      <button
        class="p-4 bg-gray-300 rounded-3xl hover:bg-slate-400"
        type="button"
        @click="open"
      >
        Choose file
      </button>
      <button
        @click="upload"
        class="rounded-3xl bg-gray-400 hover:bg-blue-400 text-xl p-4 my-8 active:bg-blue-500"
      >
        Upload
      </button>
    </div>
    <div class="p-4 my-8" v-for="file in files">
      <p>File Name: {{ file.name }}</p>
      <p>File Type: {{ file.type }}</p>
    </div>
    <div class="p-4 my-8" v-if="uploadResponse">
      <pre>Upload response: {{ uploadResponse.statusText }}</pre>
    </div>
  </div>
</template>
