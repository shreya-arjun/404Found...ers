import { JSX } from "react";
import Track from "../components/track";

export class ComponentMapper {
    public static mapSuggestions(suggestion: { tracks: { title: string }[] }): JSX.Element[] {    
        return suggestion.tracks.map((track, index) => {
          return <Track key={index} title={track.title} />;
        });
      }
}
