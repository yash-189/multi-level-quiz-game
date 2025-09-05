import ToggleButton from "../ui/ToggleButton"

const MultipleChoiceQuestion = ({ options, value, onChange, disabled }) => {
  return (
    <div className="space-y-2">
      {options.map((option, index) => (
        <ToggleButton
          key={index}
          value={option}
          selectedValue={value}
          onValueChange={onChange}
          disabled={disabled}
          className=""
        >
          {option}
        </ToggleButton>
      ))}
    </div>
  )
}

export default MultipleChoiceQuestion