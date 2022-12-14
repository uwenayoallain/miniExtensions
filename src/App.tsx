import "./App.css";
import Airtable from "airtable";
import { FormEvent, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "./hooks";
import { addClasses, login, selectUser } from "./userSlice";
import ClassCard from "./classCard";

function App(): JSX.Element {
  interface classObj {
    name: string;
    students: string[];
  }
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  let [username, setUsername] = useState("");
  let [isloading, setIsloading] = useState(false);
  let [classes, setClasses] = useState<classObj[]>([]);
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
        records[0].get("Classes").map((classId: string) => {
          base("Classes").find(classId, function (err, record: any) {
            if (err) {
              console.error(err);
              return;
            }
            const classObj: classObj = {
              name: record.get("Name"),
              students: record.get("Students"),
            };
            setClasses((prevClasses) => [...prevClasses, classObj]);
          });
        });
        dispatch(login(username));
        setIsloading(false);
      });
  };
  useEffect(() => {
    if (!isloading && user.state == "in") dispatch(addClasses(classes));
  }, [user.state, isloading, classes, dispatch]);
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
