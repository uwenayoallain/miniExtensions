import "./App.css";
import Airtable from "airtable";
import { FormEvent, useState } from "react";
import { useAppSelector, useAppDispatch } from "./hooks";
import { login, selectUser } from "./userSlice";
import ClassCard from "./classCard";

function App(): JSX.Element {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  let [username, setUsername] = useState("");
  let [isloading, setIsloading] = useState(false);
  var base = new Airtable({ apiKey: "keyhCC6Ohm7BfYFKB" }).base(
    "app8ZbcPx7dkpOnP0"
  );
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    setIsloading(true);
    e.preventDefault();
    base("Students")
      .select({
        filterByFormula: `{Name} = '${username}'`,
      })
      .firstPage(function (err, records: any) {
        if (err) {
          console.error(err);
          return;
        }
        if (records.length === 0) {
          alert("User not found");
          return;
        }
        let classes: { name: string; students: string[] }[] = [];
        base("Classes").find(
          records[0].get("Classes"),
          function (err, record: any) {
            classes.push({
              name: record.get("Name"),
              students: record.get("Students"),
            });
          }
        );
        dispatch(login({ name: username, classes }));
        setIsloading(false);
      });
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
        {user.state == "out" && !isloading ? (
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
        ) : isloading ? (
          <div>Loading...</div>
        ) : (
          <div>{user.name}</div>
        )}
      </div>
    </div>
  );
}

export default App;
