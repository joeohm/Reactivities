import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";
import DatePicker, { DatePickerProps } from "react-datepicker";

export default function DateInput(props: Partial<DatePickerProps>) {
  const [field, meta, helpers] = useField(props.name!);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <DatePicker
        {...field}
        {...props}
        selected={
          (field.value && new Date(field.value)) || (null as unknown as Date)
        }
        onChange={(date: any) => {
          helpers.setValue(date);
          props.onChange?.(
            date as unknown as Date & [Date | null, Date | null] & Date[]
          );
        }}
        showMonthYearDropdown={true}
        minDate={new Date()}
        maxDate={new Date(2026, 12, 0)}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}
