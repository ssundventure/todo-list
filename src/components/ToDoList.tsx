import { useState } from "react";
import { useForm } from "react-hook-form";

// function ToDoList() {
//   const [toDo, setToDo] = useState("");
//   const [error, setError] = useState("");

//   const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setToDo(value);
//     setError("");
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (toDo.length < 10) {
//       setError("todo should be less than 10.");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input
//           type="text"
//           value={toDo}
//           onChange={onChange}
//           placeholder="Write a to do"
//         />
//         <button>Add</button>
//         {error}
//       </form>
//     </div>
//   );
// }

interface IForm {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "write email",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="Email"
        />
        <span>{String(errors?.email?.message || "")}</span>
        <input
          {...register("username", { required: true, minLength: 5 })}
          placeholder="Username"
        />
        <input
          {...register("password", { required: true, minLength: 7 })}
          placeholder="Password"
        />
        <input
          {...register("confirmPassword", {
            required: "password is required",
            minLength: { value: 7, message: "Your password is too short." },
          })}
          placeholder="ConfirmPassword"
        />
        <span>{String(errors?.confirmPassword?.message || "")}</span>

        <button>add</button>
      </form>
    </div>
  );
}

export default ToDoList;
