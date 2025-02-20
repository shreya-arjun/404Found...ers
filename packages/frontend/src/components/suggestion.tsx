import Track from "./track";
import "../styling/suggestionComponent.scss";
import { JSX } from "react";

export interface SuggestionProps {
    suggestionId: string;
    suggestionName: string; // as a title
    dateSuggested: string;
    basedOn: string; // list of emotions
    tracks: JSX.Element[]; // list of track objects
}

const Suggestion: React.FC<SuggestionProps> = ({
    suggestionId,
    suggestionName,
    dateSuggested,
    basedOn,
    tracks,
}) => {
    //const trackString = tracks.slice(0,3).map((track) => track.title);

    return (
        <div key={suggestionId} className="suggestionContainer">
            <div className="suggestionRow">
                <h2 id="name" className="suggestionElement">{suggestionName}</h2>
                <h2 id="emotion" className="suggestionElement">{basedOn}</h2>
                <h2 id="tracks" className="suggestionElement">{tracks}</h2>
                <h2 id="date" className="suggestionElement">{dateSuggested}</h2>
            </div>
        </div>
    )
};

export default Suggestion;
