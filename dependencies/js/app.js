"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
class reactNativeTSTemplate extends React.Component {
    render() {
        return (<react_native_1.View style={styles.container}>
        <react_native_1.Text style={styles.welcome}>
          Welcome to React Native! This is wonderful!
        </react_native_1.Text>
        <react_native_1.Text style={styles.instructions}>
          To get started, edit index.android.js
        </react_native_1.Text>
        <react_native_1.Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </react_native_1.Text>
      </react_native_1.View>);
    }
}
exports.default = reactNativeTSTemplate;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
//# sourceMappingURL=app.js.map