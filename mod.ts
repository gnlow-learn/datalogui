import * as datalog from "https://esm.sh/@datalogui/datalog@0.0.11"

const Human = datalog.newTable({
    name: datalog.StringType,
})

Human.assert({ name: "Alice" })

const Pass = datalog.newTable({
    dYear: datalog.NumberType,
})
const CurrentYear = datalog.newTable({
    year: datalog.NumberType,
})

const CurrentYearQuery = datalog.query
<{ year: number, dYear: number }>
(({ year, dYear }) => {
    Pass({ dYear })
    CurrentYear({ year })
})

CurrentYearQuery.viewExt()
    .mapEffect(({ kind, datum: { year, dYear }}) => {
        if (kind == datalog.Added) {
            Pass.retract({ dYear })
            CurrentYear.retract({ year })
            CurrentYear.assert({ year: year + dYear })
        }
    })
    .onChange(() => {
        CurrentYearQuery.runQuery()
    })

CurrentYearQuery.onDependencyChange(() => {
    CurrentYearQuery.runQuery()
})

CurrentYear.view().onChange(() => {
    console.log(CurrentYear.view().readAllData())
})

CurrentYear.assert({ year: 10 })
Pass.assert({ dYear: 1 })
