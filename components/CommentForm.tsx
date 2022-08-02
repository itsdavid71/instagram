import { TextField, Button, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { FC } from "react";

type CommentFormProps = {
  onSubmit: (data: FormData) => void;
};

type FormData = {
  text: string;
};
const CommentForm: FC<CommentFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onFormSubmit = handleSubmit((data) => {
    onSubmit(data);
  });
  return (
    <form onSubmit={onFormSubmit}>
      <TextField
        sx={{ mt: 2 }}
        {...register("text", { required: true })}
        multiline
        fullWidth
        rows={3}
        placeholder="Введите комментарий"
      />
      {errors.text && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Пожалуйста, введите комментарий
        </Alert>
      )}
      <Button sx={{ mt: 2 }} fullWidth type="submit" variant="contained">
        Отправить
      </Button>
    </form>
  );
};

export default CommentForm;
