import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  parentButton: {
    marginTop: theme.spacing(4)
  }}));


const bookShowDialog = (props) => {
  const classes = useStyles();
  const [book, setBook] = useState({
    bookNm: null,
    bookPage: null,
  });

  /** ページプロパティ */
  const pageProps = {
    parentBookList: [
      {
        bookId: 0,
        bookNm: "テスト"
      }
    ]
  }

  const handleBookEntryDialogClose = () => {
    setBook({})
    props.onClose()
  }

  const compProps = {
    dialog: {
      open: props.open,
      onClose: handleBookEntryDialogClose,
      scroll:'paper',
    },
    dialogContent: {
      dividers: true
    },
    dialogContentText: {
      tabIndex: -1
    },
    saveButton: {
      onClick: () => props.onSave(book),
      color: "primary",
      disabled: !book.bookNm || (!book.bookPage || !isFinite(book.bookPage))
    },
    cancelButton: {
      onClick: handleBookEntryDialogClose,
      color: "primary"
    },
    bookNm: {
      label: "タイトル",
      variant: "outlined",
      fullWidth: true,
      value: book.bookNm,
      onChange: (e) => setBook({...book, bookNm: e.target.value}),
      helperText:pageProps.errorMessage,
      error: pageProps.errorMessage,
    },
    parentBook: {
      label: "ページ数",
      value: book.bookPage,
      variant: "outlined",
      className: classes.parentButton,
      fullWidth: true,
      size:"small",
      error: pageProps.errorMessage,
      onChange: (e) => setBook({...book, bookPage: e.target.value})
    },
  }

  return (
      <Dialog {...compProps.dialog}>
        <DialogTitle>ファスト＆スロー</DialogTitle>
        <DialogContent {...compProps.dialogContent}>
          <img src="http://books.google.com/books/content?id=OtH1wAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api" />
          <DialogContentText {...compProps.dialogContentText}>
            <Typography>200ページ</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button {...compProps.cancelButton}>
            キャンセル
          </Button>
          <Button {...compProps.saveButton}>
            追加
          </Button>
        </DialogActions>
      </Dialog>
  );
}

bookShowDialog.propTypes = {
    open: PropTypes.bool,       //表示フラグ
    onClose: PropTypes.func,    //閉じる処理
    onSave: PropTypes.func,     //保存処理
  }
  
  export default bookShowDialog;