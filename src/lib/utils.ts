import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface XMLObject {
  [key: string]: XMLValue;
}

export type XMLValue = string | XMLObject | (string | XMLObject)[];

export function xmlToJson(xml: Element): XMLValue {
  const obj: XMLObject = {};
  
  // Handle attributes
  if (xml.attributes) {
    for (let i = 0; i < xml.attributes.length; i++) {
      const attr = xml.attributes[i];
      obj[attr.nodeName] = attr.nodeValue ?? '';
    }
  }

  // Handle child nodes
  for (let i = 0; i < xml.childNodes.length; i++) {
    const item = xml.childNodes[i];
    const nodeName = item.nodeName;

    if (nodeName === "#text") {
      if (item.nodeValue?.trim()) {
        return item.nodeValue;
      }
    } else {
      const itemJson = xmlToJson(item as Element);
      
      if (obj[nodeName]) {
        if (!Array.isArray(obj[nodeName])) {
          obj[nodeName] = [obj[nodeName]];
        }
        if (Array.isArray(obj[nodeName])) {
          (obj[nodeName] as XMLValue[]).push(itemJson);
        }
      } else {
        obj[nodeName] = itemJson;
      }
    }
  }
  
  return obj;
}
