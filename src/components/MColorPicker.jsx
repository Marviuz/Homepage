import { Chrome } from 'vue-color'

export default {
  components: { 'chrome-picker': Chrome },
  data () {
    return {
      color: { r: 101, g: 101, b: 101 }
    }
  },
  render () {
    return (
      <chrome-picker v-model={this.color} />
    )
  }
}
