// @flow
const { getStorybookUI, configure } = require('@storybook/react-native')
const { loadStories } = require('./stories')

configure(() => loadStories(), module)

const StorybookUI = getStorybookUI({ port: 9001, onDeviceUI: false })
export default StorybookUI
