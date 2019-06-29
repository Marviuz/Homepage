export default {
  props: {
    itemDetails: {
      type: Object,
      default() {
        return {
          name: 'N/A',
          logo: require('@/assets/sad_smiley.svg'),
          site: '/',
        };
      },
    },
    editable: Boolean,
  },
  render() {
    if (this.editable) return <m-card name={this.itemDetails.name} logo={this.itemDetails.logo} />;
    return (
      <m-card
        site={this.itemDetails.site}
        name={this.itemDetails.name}
        logo={this.itemDetails.logo}
      />
    );
  },
};
