
export interface ActionButtonProps {
  imagePath: string;
  text: string;
  action: VoidFunction;
  style?: ActionButtonStyling;
}

const Suggestion : React.FC<ActionButtonProps> = () => {
    return (
        <div className="suggestionContainer">
            
        </div>
    )
}

export default Suggestion;