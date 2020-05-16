<template>
  <el-form :model="controls" :rules="rules" ref="form" @submit.native.prevent="onSubmit">
    <h1>Добавить комментарий</h1>
    <el-form-item label="Ваше имя" prop="name">
      <el-input v-model="controls.name"></el-input>
    </el-form-item>
    <el-form-item label="Текст комментария" prop="text">
      <el-input type="textarea" resize="none" :rows="2" v-model="controls.text"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit" round :loading="loading">Добавить комментарий</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    postId: {
      type: String,
      required: true
    }
  },
  data: () => ({
    loading: false,
    controls: {
      name: "",
      text: ""
    },
    rules: {
      name: [
        {
          required: true,
          message: "Имя не должно быть пустым.",
          trigger: "blur"
        }
        // { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" }
      ],
      text: [
        {
          required: true,
          message: "Введите комментарий.",
          trigger: "change"
        }
      ]
    }
  }),
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true;

          const formData = {
            name: this.controls.name,
            text: this.controls.text,
            postId: this.postId
          };
          try {
            const newComment = await this.$store.dispatch(
              "comment/create",
              formData
            );

            this.$message.success("Комментарий добавлен");
            this.$emit("created", newComment);
          } catch (e) {
            this.loading = false;
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>