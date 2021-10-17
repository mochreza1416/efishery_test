const app = {
  parsePaste: ({ raw, fields, onPaste }) => {
    if (!onPaste) return;

    const rasRows = raw.split('\n');
    const rows = [];
    if (rasRows && rasRows.length) {
      rasRows.forEach(rawRow => {
        const values = rawRow.split('\t');
        const row = {};
        fields.forEach((field, idx) => {
          if (values[idx - 1] !== undefined) {
            row[field.name] = values[idx - 1];
            if (values[idx - 1] && values[idx - 1].split('\r')) {
              row[field.name] = values[idx - 1].split('\r')[0];
            }
          }
        });
        rows.push(row);
      });
      onPaste(rows);
    }
  },
}

export default app;
