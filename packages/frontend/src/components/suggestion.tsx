import Track from "./track";

export interface SuggestionProps {
    suggestionId: string,
    suggestionName: string, // as a title
    dateSuggested: string, 
    basedOn: string[], // list of emotions
    tracks: typeof Track[], // list of track objects
}

const Suggestion : React.FC<SuggestionProps> = ({suggestionId, suggestionName, dateSuggested, basedOn, tracks}) => {
    return (
        <div key={suggestionId} className="suggestionContainer">
            
        </div>
    )
}

export default Suggestion;