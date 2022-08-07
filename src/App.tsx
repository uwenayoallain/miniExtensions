import "./App.css";
import Airtable from "airtable";
import { FormEvent, useState } from "react";
import { useAppSelector, useAppDispatch } from "./hooks";
import { login, selectUser } from "./userSlice";

function App(): JSX.Element {
  const user = useAppSelector(selectUser);
  console.log(user);
  const dispatch = useAppDispatch();
  let [username, setUsername] = useState("");
  var base = new Airtable({ apiKey: "keyhCC6Ohm7BfYFKB" }).base(
    "app8ZbcPx7dkpOnP0"
  );
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(username));
  };
  // base("Students")
  //   .select({
  //     filterByFormula: `{Name} = '${key}'`,
  //   })
  //   .firstPage(function (err, records: any) {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //     let classes: string[] = records[0].get("Classes");
  //     classes.map((classId: string) => {
  //       base("Classes").find(classId, function (err, record: any) {
  //         if (err) {
  //           console.error(err);
  //           return;
  //         }
  //         let students: string[] = record.get("Students");
  //         students.map((studentId: string) => {
  //           base("Students").find(studentId, function (err, record: any) {
  //             if (err) {
  //               console.error(err);
  //               return;
  //             }
  //             console.log(record.get("Name"));
  //           });
  //         });
  //       });
  //     });
  //   });

  return (
    <div>
      <div className='form'>
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
          <input
            type='text'
            name='username'
            id='username'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <button>login</button>
        </form>
        <p>{user.name}</p>
      </div>
    </div>
  );
}

export default App;
