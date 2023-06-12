import React, { useRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useStore } from './store';
import yaml from 'js-yaml';
import { IconButton, Box } from '@mui/material';
import { FileCopy, Check } from '@mui/icons-material';

interface ConfigModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ConfigModal({ open, onClose }: ConfigModalProps) {
  const { config } = useStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      document.execCommand('copy');
      setCopied(true);
    }
  };

  const handleClose = () => {
    setCopied(false);
    onClose();
  };

  const yamlConfig = yaml.dump(config);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="config-dialog-title"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle id="config-dialog-title">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Config</Typography>
          <IconButton onClick={handleCopyClick}>{copied ? <Check /> : <FileCopy />}</IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" component="div">
          <textarea
            ref={textareaRef}
            readOnly
            value={yamlConfig}
            style={{
              width: '100%',
              minHeight: '200px',
              fontFamily: 'monospace',
              border: '1px solid #ccc',
            }}
          />
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
