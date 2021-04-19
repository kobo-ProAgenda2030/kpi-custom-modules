import React from "react";
import { useEffect, useState } from "react";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { dataController } from "../../controller/DataController";
import { UseExecuter } from "../../utils/useExecuter";
import { ShinyAssets } from "../../models/KoboUser";
import { useBehaviorState } from "../../utils/useBehaviorState";

export function ShinyMenu({ baseURL }: { baseURL: string }) {
  const [assets, setAssets] = useState<ShinyAssets[]>([]);
  const selected = useBehaviorState<ShinyAssets | null>(
    dataController.shinySelected
  );
  const { executer } = UseExecuter();

  useEffect(() => {
    executer(async () => {
      await dataController.load(baseURL);
      setAssets(dataController.session.shinyAssets);
    });
  }, [baseURL]);
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Total:{assets.length}
        </ListSubheader>
      }
    >
      {assets.map((asset, index) => {
        return (
          <ListItem
            button
            key={index}
            style={{ background: asset === selected ? "#669EA6" : "" }}
            onClick={() => {
              dataController.shinySelected.next(asset);
            }}
          >
            <ListItemText
              primary={asset.name}
              style={{ color: asset === selected ? "white" : "black" }}
            />
          </ListItem>
        );
      })}
    </List>
  );
}
