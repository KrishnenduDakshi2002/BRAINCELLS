
const fetch = require('node-fetch');

const res =fetch('https://akshar-siksha.herokuapp.com/api/data/classroom/create/class', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer '+ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmY3NDFhY2NhZDUzMmRmMTBlY2RjMTUiLCJpYXQiOjE2NjA0NDAwNjN9.yhVlUDsWIwAsu5rgM-WfursrFJ1OkUPHWsN5_FLnACY'
      },
      body: JSON.stringify({
        "classroom_id":"62f8520605bd56b265c2e0d0",
        "topic":"Today class 20.1",
        "subject": "Math",
        "teacher" : "Ankesh sir",
        "dateTime":"2022-08-20T16:32:28Z"
      })
    }).then((res)=> res.json())
    .then((json)=> console.log(json));