
for category chartt:
{
    color:
    "#45ebf3"
    recordDate:
    "2019-06-06"
    recordReps:
    28
    recordType:
    "reps"
    recordWeight:
    null
    stroke:
    "#643a4e"
    userBday:
    "1981-02-15"
    userBodyWeight:
    133.5
    userFatPerc:
    0.22
    userFirstName:
    "Numbers"
    userGender:
    "m"
    userHeight:
    64
    
    userIsParent:
    true
    userLastName:
    "Senger"
    userMusclePerc:
    0.34
    userPseudo:
    "admiring oyster"
    x:
    null
    y:
    null

}

for personal category chart:

{
    created_at:
    "2019-06-28T21:02:54.657Z"
    date:
    "2019-01-01"
    event_name:
    "Pull-Ups"
    id:
    4781
    pr_category_id:
    3
    reps:
    14
    time_length:
    null
    updated_at:
    "2019-06-28T21:02:54.657Z"
    user_id:
    59
    weight:
    null
    weight_reps_or_time_based:
    "reps"
}

    let newData = {
        // User: this.capital_letter(data.userPseudo),
        x: data.x,
        y: data.y,
        user: `${loggedInUser.first_name} ${loggedInUser.last_name}`,
        date: moment(data.date, 'YYYY-MM-DD').format('MM-DD-YYYY'),
        record: data[`${data.weight_reps_or_time_based}`] + ` ${recordUnits.data.weight_reps_or_time_based}`
    }

weight records = {
    body_fat_perc:
    0.1
    body_muscle_perc:
    0.41
    created_at:
    "2019-06-27T18:32:00.127Z"
    id:
    590
    updated_at:
    "2019-06-27T18:32:00.127Z"
    user_id:
    59
    weigh_date:
    "2019-05-02"
    weight_lb:
    148.5
}