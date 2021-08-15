<template>
  <span>
    {{ displayText }}
    <button
      v-if="isTooLong && !isExpanded"
      class="link"
      type="button"
      @click="isExpanded = true"
    >
      read more
    </button>
    <button
      v-if="isTooLong && isExpanded"
      class="link"
      type="button"
      @click="isExpanded = false"
    >
      read less
    </button>
  </span>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    target: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      chunks: [],
      isExpanded: false,
    };
  },

  computed: {
    isTooLong() {
      return this.chunks.length === 2;
    },
    displayText() {
      if (this.isTooLong && !this.isExpanded) {
        return `${this.chunks[0]}...`;
      }

      // if text is too long and user has clicked to expand just join the 2 chunks
      return this.chunks.join('');
    },
  },

  // created is called on server and on client
  created() {
    this.chunks = this.getChunks();
  },

  methods: {
    getChunks() {
      const position = this.text.indexOf(' ', this.target);
      // if no space could be found after target
      // OR
      // the text lenght is shorter than the target, then just return one chunk with the text
      if (position < 0 || this.target >= this.text.length) return [this.text];

      // otherwise, return 2 chunks
      return [this.text.substring(0, position), this.text.substring(position)];
    },
  },
};
</script>

<style scoped>
.link {
  color: blue;
  background-color: transparent;
  text-decoration: underline;
  border: none;
  cursor: pointer;
}

.link:focus {
  border: none;
  outline: none;
}
</style>
