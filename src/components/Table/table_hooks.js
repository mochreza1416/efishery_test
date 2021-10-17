import React from 'react';
import { Select, InputNumber } from 'antd';
import ReactDataSheet from 'react-datasheet';
import SelectReact from 'react-select';
import copasUtil from './copas';
import 'react-datasheet/lib/react-datasheet.css';

const App = ({ fields = [], dataSource = [], onChange, onPaste }) => {
  let cellvalues = {};

  const valueViewerHeader = (props) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5px 10px', fontWeight: 'bold' }}>{props.value}</div>
    );
  };

  const valueViewerContent = (props) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', verticalAlign: 'middle', padding: '1px 10px' }}>{props.value}</div>
    );
  };

  const handleValueRenderer = (cell, idx, col) => {
    if (idx) {
      const field = fields[col];
      if (field && field.type === 'number' && field.onChange && field.name && cellvalues[field.name]) {
        if (cellvalues[field.name]) {
          const values = cellvalues[field.name];
          if (values && values.idx === idx - 1) {
            field.onChange({ value: `${values.value}`, idx: values.idx });
          }
        }
      }
    }
    return cell.value;
  }

  const handleOnCellsChanged = (props) => {
    if (props && Array.isArray(props) && props.length) {
      const [{ row, col, value }] = props;
      const field = fields[col];
      const values = dataSource[row - 1];
      const key = field.name;
      values[key] = value;

      if (onChange) onChange({ value, values, idx: row - 1, name: field.name });
      if (field.onChange) field.onChange({ value, values, idx: row - 1, name: field.name });
    }
  }

  const transformDataSource = () => {
    const header = [...fields.map(m => ({
      value: m.text,
      width: m.width,
      readOnly: true,
      valueViewer: valueViewerHeader
    }))];
    const rows = [];

    if (dataSource && dataSource.length) {
      dataSource.forEach((item, idxRow) => {
        const row = [];
        Object.keys(fields).forEach(idx => {
          const refRow = fields[idx];
          const key = refRow.name;
          const payload = {
            value: item[key] || '',
            readOnly: !refRow.editable,
            valueViewer: (props) => {
              if (refRow.render) return refRow.render({ ...props });

              if (refRow.type === 'select') {
                if (props.value && props.value.editMode) {

                  let listMap = refRow.dataSource || [];
                  if (refRow.dataSourceKey) {
                    const dataRow = dataSource[props.row - 1];
                    if (dataRow && dataRow[refRow.dataSourceKey]) {
                      listMap = dataRow[refRow.dataSourceKey] || [];
                    }
                  }

                  return (
                    <div style={{ margin: '-8px 1px -8px 1px' }}>
                      <Select
                        showSearch
                        dropdownMatchSelectWidth={true}
                        style={{ width: '220px' }}
                        onSelect={(value) => {
                          if (refRow.onChange) {
                            refRow.onChange({ value, idx: props.row - 1 });
                          }
                        }}
                        filterOption={(input, option) => {
                          if (option.props && option.props.value && typeof (option.props.value) === 'string') {
                            return option.props.value.toUpperCase().indexOf(input.toUpperCase()) >= 0;
                          }
                          return true;
                        }}
                        onBlur={refRow.setViewMode}
                        defaultValue={props.value.value || ''}
                        loading={refRow.loading}
                        onSearch={refRow.onSearch}
                      >
                        {listMap.map(m => (
                          <Select.Option value={m.value} key={m.key || m.value}>{m.text}</Select.Option>
                        ))}
                      </Select>
                    </div>
                  )
                }

                return (
                  <div style={{ height: 24, paddingTop: 2, cursor: 'pointer' }} onDoubleClick={() => { if (refRow.setEditMode) refRow.setEditMode(props.row - 1) }}>
                    {props.value}&nbsp;
                  </div>
                )
              }

              if (refRow.type === 'number') {
                if (item && item[key] && item[key].errorMode && item[key].message) {
                  return (
                    <div style={{ margin: '0px 1px', textAlign: 'left', paddingLeft: 10, color: 'red' }}>
                      {item[key].message}
                    </div>
                  )
                }

                if (props.value && props.value.editMode) {
                  let value = 0;

                  return (
                    <div style={{ margin: '-8px 1px -8px 1px' }}>
                      <InputNumber
                        defaultValue={props.value.value || 0}
                        style={{ width: '100%', height: '100%' }}
                        onPressEnter={() => {
                          if (refRow.onChange) {
                            refRow.onChange({ value, idx: props.row - 1 });
                          }
                        }}
                        onChange={(val) => { value = val }}
                      />
                    </div>
                  )
                }

                if (refRow.editable) {
                  return (
                    <div style={{ height: 24, paddingTop: 2, cursor: 'pointer', paddingRight: 10 }}>
                      {refRow.format && props.value !== '' && props.value !== undefined ? refRow.format(+props.value) : props.value}&nbsp;
                    </div>
                  )
                } else {
                  return (
                    <div style={{ height: 24, paddingTop: 2, cursor: 'pointer' }} onDoubleClick={() => { refRow.setEditMode(props.row - 1) }}>
                      {props.value}&nbsp;
                    </div>
                  )
                }
              }

              return valueViewerContent(props);
            }
          }

          if (refRow.type === 'number' && refRow.format) {
            payload.dataEditor = (props) => {

              let editValue = '';
              if (payload.value) {
                const payloadValue = payload.value;

                if (payloadValue.errorMode && payloadValue.message) {
                  editValue = payload.value.message;
                } else {
                  if (refRow.format) {
                    editValue = refRow.format(+payloadValue);
                  }
                }
              }

              return (
                <div style={{ height: '100%' }}>
                  <input
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && props.onCommit) {
                        props.onCommit(e.target.value);
                      }
                    }}
                    onChange={(e) => {
                      cellvalues[refRow.name] = { value: e.target.value, idx: idxRow }
                    }}
                    defaultValue={editValue}
                    style={{ height: '100%', paddingRight: 15, width: '100%', textAlign: 'right' }} />
                </div>
              )
            }
          }

          if (refRow.type === 'react-select') {
            payload.dataEditor = (props) => {
              let listMap = refRow.dataSource || [];
              const option = {
                options: listMap.map(m => ({ value: m.value, label: m.text })),
                defaultMenuIsOpen: true,
                onInputChange: (val) => { 
                  if (refRow.onSearch) {
                    refRow.onSearch(val);
                  }
                },
                onChange: (val) => {
                  if (refRow.onChange) {
                    props.onCommit(val.value);
                    refRow.onChange({ value: val.value, idx: props.row - 1 });
                  }
                },
              }
              return (
                <div style={{ width: '250px', textAlign: 'left' }}>
                  <SelectReact {...option}  defaultInputValue={refRow.defaultInputValue}/>
                </div>
              )
            }

            payload.valueViewer = (props) => {
              return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', verticalAlign: 'middle', padding: '1px 10px' }}>{props.value}</div>
              );
            }
          }

          row.push(payload);
        });
        rows.push(row);
      });
    }
    return [header, ...rows];
  }

  return (
    <div>
      <ReactDataSheet
        data={transformDataSource()}
        valueRenderer={handleValueRenderer}
        onCellsChanged={handleOnCellsChanged}
        parsePaste={(raw) => {
          copasUtil.parsePaste({ raw, fields, onPaste });
        }}
      />
    </div>
  );
}

export default App;