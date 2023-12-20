import pool from "../database/dbIndex";
import {
  mainRoute,
  getRoute,
  oauthRoute,
  postRoute,
  patchRoute,
} from "../../../utils/APIRouteSetter";

const mainURL = mainRoute();

// // Function to grab participant attendance data from Zoom API and add to our database
export default async function attendanceZoomToDb() {
  // Grab zoom data of everyone, latest meeting ID
  const ZoomparticipantsJSON = await fetch(
    `${mainURL}${oauthRoute}getMeetingParticipants`
  );
  const AllParticipantsJSON = await fetch(
    `${mainURL}${getRoute}getListBootcampers`
  );

  //   console.log(ZoomparticipantsJSON);

  // //variable/ reponse clean up
  const ZoomparticipantsClean = await ZoomparticipantsJSON.text();
  const zoomParticipants = JSON.parse(ZoomparticipantsClean);

  console.log(zoomParticipants);

  // This is an example of how data should look like after we run zoomParticipants
  //   // const parsedData = {
  //   //   success: true,
  //   //   participants: [
  //   //     {
  //   //       registrant_id: "_ic4PfRWS1mCf5GsC3Zhcg",
  //   //       name: "(Kit) Wing-Kit Leung",
  //   //       user_email: "wing_kitleung@hotmail.com",
  //   //       day: "2023-12-14T",
  //   //       duration: 182,
  //   //       join_leave: [
  //   //         {
  //   //           join: "2023-12-14T10:11:12Z",
  //   //           leave: "2023-12-14T10:11:15Z",
  //   //         },
  //   //         {
  //   //           join: "2023-12-14T10:11:15Z",
  //   //           leave: "2023-12-14T10:12:17Z",
  //   //         },
  //   //         {
  //   //           join: "2023-12-14T10:12:17Z",
  //   //           leave: "2023-12-14T10:12:22Z",
  //   //         },
  //   //         {
  //   //           join: "2023-12-14T10:12:23Z",
  //   //           leave: "2023-12-14T10:12:32Z",
  //   //         },
  //   //         {
  //   //           join: "2023-12-14T10:12:32Z",
  //   //           leave: "2023-12-14T10:12:41Z",
  //   //         },
  //   //         {
  //   //           join: "2023-12-14T10:12:41Z",
  //   //           leave: "2023-12-14T10:12:45Z",
  //   //         },
  //   //         {
  //   //           join: "2023-12-14T10:12:46Z",
  //   //           leave: "2023-12-14T10:14:16Z",
  //   //         },
  //   //       ],
  //   //     },
  //   //   ],
  //   // };

  //   const allParticipantsClean = await AllParticipantsJSON.text()
  //   const allParticipants = JSON.parse(allParticipantsClean)

  //   // debug logger
  //   console.log('zoomParticipants');
  //   console.log(zoomParticipants);
  //   console.log('AllParticipants');
  //   console.log(allParticipants);
  // //start loop

  // for(let i=0; i < zoomParticipants.participants.length; i++) {

  //   const currentZoomID = zoomParticipants.participants[i].registrant_id
  //   const duration= zoomParticipants.participants[i].duration
  //   // If zoomid then do following:
  //   //see if zoom id exists
  //   for (let j=0; j < allParticipants.length; j++) {
  //     if (currentZoomID.includes(!allParticipants.data[j].zoomid)  ) {
  //     try {
  //     // if doesnt then add bootcamper to database
  //     const response = await fetch(`${mainURL}${postRoute}
  //     postBootcamperAttendance?=${currentZoomID}`, {
  //       // set header
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       // send name in the body
  //       body: JSON.stringify(currentZoomID.name),
  //     });
  //       // log that it works
  //       const result = await response.json()
  //       console.log("Success:", result)
  //       // log if it errors
  //     } catch (error) {
  //       console.log('Error:', error)
  //     }

  //   }
  //   //patch section
  //   const newAttendanceHours= (duration/3600);
  //   const newTotalAttendancehours=allParticipants.data[j].total_attendance_hours + (duration/3600);
  //   const newDays=  (newAttendanceHours>= 7)?allParticipants.data[j].total_days_attended += 1:allParticipants.data[j].total_days_attended ;
  //   const newMissingStreak=(newAttendanceHours< 7)?allParticipants.data[j].missing_streak += 1:allParticipants.data[j].missing_streak =0;
  // try {
  //   // if doesnt then add bootcamper to database
  //   const response = await fetch(`${mainURL}${patchRoute}
  //   registerBootcamperAttendance?=${currentZoomID}`, {
  //     // set header
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     // send name in the body
  //     body: JSON.stringify({todays_attendance_hours: newAttendanceHours,
  //       total_attendance_hours:newTotalAttendancehours,
  //       total_days_attended:newDays,
  //       missing_streak:newMissingStreak,}),
  //   });
  //     // log that it works
  //     const result = await response.json()
  //     console.log("Success:", result)
  //     // log if it errors
  //   } catch (error) {
  //     console.log('Error:', error)
  //   }

  // }

  //  }

  //  //end loop if
  //  //then do patch
  // // If no zoomid then insert new row

  //   // Format information into this shape:
  //   // Raw data from zoom:
  //   // todays_attendance_hours = COALESCE ($1, todays_attendance_hours),
  //   // WHERE zoomId = $5

  //   // Convert duration (seconds) to hours.

  //   // Get data from database

  //   // Calculated from DB + Zoom
  //   // total_attendance_hours = COALESCE ($2, total_attendance_hours),
  //   // total_days_attended = COALESCE ($3, total_days_attended),
  //   // missing_streak = COALESCE ($4, missing_streak)

  //   // Create loop to patch by zoomid.

  //   // console.log(getBootcampers);

  //   // pool.end();
}

// //http://localhost:3000/api/dbLink/attendance

attendanceZoomToDb();
