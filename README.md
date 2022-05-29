# Task Verification Through Pictures Using an Instruction Image and a Phone Camera

This project is the product of the bachelor project for group 4:

* [Svend Anton Vibæk](svvib19@student.sdu.dk)
* [Philip Eckhoff Rønnest](phroe19@student.sdu.dk)

University of Southern Denmark (SDU) <br>
Mærsk Mc-Kinney Møller Instituttet <br>
T510012102, Bachelorprojekt (F22)

> :warning: The `/deep-learning` folder contains a lot of experimental code

## Install dependencies

```
yarn
```

### If the dependencies are broken try

```
expo doctor --fix-dependencies
```

## To run the project

```bash
cd /frontend/

yarn start
```

### If you have trouble running it

1. navigate to go to `\frontend\node_modules\expo-modules-core\build\NativeViewManagerAdapter.native.js`
2. Comment out or delete the following part from line `19` - `25`

```typescript
if (__DEV__) {
    const { NativeUnimoduleProxy } = NativeModules;
    if (!NativeUnimoduleProxy.viewManagersNames.includes(viewName)) {
        const exportedViewManagerNames = NativeUnimoduleProxy.viewManagersNames.join(', ');
        console.warn(`The native view manager required by name (${viewName}) from NativeViewManagerAdapter isn't exported by @unimodules/react-native-adapter. Views of this type may not render correctly. Exported view managers: [${exportedViewManagerNames}].`);
    }
}
```

