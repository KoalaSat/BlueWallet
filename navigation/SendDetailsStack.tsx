import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';

import navigationStyle, { navigationStyleTx } from '../components/navigationStyle';
import { useTheme } from '../components/themes';
import loc from '../loc';
import {
  CoinControlComponent,
  ConfirmComponent,
  CreateTransactionComponent,
  PsbtMultisigComponent,
  PsbtMultisigQRCodeComponent,
  PsbtWithHardwareWalletComponent,
  SelectWalletComponent,
  SendDetailsComponent,
  SuccessComponent,
} from './LazyLoadSendDetailsStack';
import { SendDetailsStackParamList } from './SendDetailsStackParamList';
import HeaderRightButton from '../components/HeaderRightButton';

const Stack = createNativeStackNavigator<SendDetailsStackParamList>();

const SendDetailsStack = () => {
  const theme = useTheme();
  const DetailsButton = useMemo(() => <HeaderRightButton testID="Save" disabled={true} title={loc.send.create_details} />, []);

  return (
    <Stack.Navigator initialRouteName="SendDetails" screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen
        name="SendDetails"
        component={SendDetailsComponent}
        options={navigationStyleTx({}, options => ({
          ...options,
          title: loc.send.header,
          statusBarStyle: 'light',
        }))(theme)}
        initialParams={{ isEditable: true }} // Correctly typed now
      />
      <Stack.Screen
        name="Confirm"
        component={ConfirmComponent}
        options={navigationStyle({ title: loc.send.confirm_header, headerRight: () => DetailsButton })(theme)}
      />
      <Stack.Screen
        name="PsbtWithHardwareWallet"
        component={PsbtWithHardwareWalletComponent}
        options={navigationStyle({ title: loc.send.header, gestureEnabled: false, fullScreenGestureEnabled: false })(theme)}
      />
      <Stack.Screen
        name="CreateTransaction"
        component={CreateTransactionComponent}
        options={navigationStyle({ title: loc.send.create_details })(theme)}
      />
      <Stack.Screen
        name="PsbtMultisig"
        component={PsbtMultisigComponent}
        options={navigationStyle({ title: loc.multisig.header })(theme)}
      />
      <Stack.Screen
        name="PsbtMultisigQRCode"
        component={PsbtMultisigQRCodeComponent}
        options={navigationStyle({ title: loc.multisig.header })(theme)}
      />
      <Stack.Screen
        name="Success"
        component={SuccessComponent}
        options={navigationStyle({ headerShown: false, gestureEnabled: false })(theme)}
      />
      <Stack.Screen
        name="SelectWallet"
        component={SelectWalletComponent}
        options={navigationStyle({ title: loc.wallets.select_wallet })(theme)}
      />
      <Stack.Screen name="CoinControl" component={CoinControlComponent} options={navigationStyle({ title: loc.cc.header })(theme)} />
    </Stack.Navigator>
  );
};

export default SendDetailsStack;
