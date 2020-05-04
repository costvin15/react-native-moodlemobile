import React from 'react';
import {Dialog as DialogPaper, Paragraph, Button} from 'react-native-paper';

const Dialog = ({visible, title, content, onDismiss, doneText}) => (
  <DialogPaper visible={visible} onDismiss={onDismiss}>
    <DialogPaper.Title>{title}</DialogPaper.Title>
    <DialogPaper.Content>
      <Paragraph>{content}</Paragraph>
    </DialogPaper.Content>
    <DialogPaper.Actions>
      <Button onPress={onDismiss}>{doneText}</Button>
    </DialogPaper.Actions>
  </DialogPaper>
);

export default Dialog;
