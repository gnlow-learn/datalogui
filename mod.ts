import * as datalog from "https://esm.sh/@datalogui/datalog@0.0.11"

const Human = datalog.newTable({
    name: datalog.StringType,
})

Human.assert({ name: "Alice" })
