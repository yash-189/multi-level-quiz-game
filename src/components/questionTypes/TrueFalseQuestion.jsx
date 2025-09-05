import ToggleButton from "../ui/ToggleButton"

const TrueFalseQuestion = ({ value, onChange, disabled }) => {
  return (
    <div className="space-y-2">
      <ToggleButton
        value="true"
        selectedValue={value}
        onValueChange={onChange}
        disabled={disabled}
      >
        True
      </ToggleButton>
      <ToggleButton
        value="false"
        selectedValue={value}
        onValueChange={onChange}
        disabled={disabled}
      >
        False
      </ToggleButton>
    </div>
  )
}

export default TrueFalseQuestion