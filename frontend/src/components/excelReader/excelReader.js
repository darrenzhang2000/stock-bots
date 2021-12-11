// import * as XLSX from 'xlsx';

// var name = './testReports/AAPL_test_report.xlsx';
// const reader = new FileReader();
// reader.onload = (evt) => { // evt = on_file_select event
//     /* Parse data */
//     const bstr = evt.target.result;
//     const wb = XLSX.read(bstr, {type:'binary'});
//     /* Get first worksheet */
//     const wsname = wb.SheetNames[0];
//     const ws = wb.Sheets[wsname];
//     /* Convert array of arrays */
//     const data = XLSX.utils.sheet_to_csv(ws, {header:1});
//     /* Update state */
//     console.log("Data>>>"+data);
// };
// reader.readAsBinaryString(f);

import {useState, useEffect} from 'react';

const initConfig = {
    fileName: `export-${Date.now()}.xlsx`,
};

export function useXlsExport(config = initConfig) {
    const [data, setData] = useState();

    useEffect(() => {
        if (!data) {
            return;
        }

        const blob = new Blob([data], {
            type: 'application/vnd.ms-excel',
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.style = 'display: none';

        document.body.append(link);

        link.href = url;
        link.download = config.fileName;
        link.click();
        window.URL.revokeObjectURL(url);
    }, [data]);

    return [data, setData];
}