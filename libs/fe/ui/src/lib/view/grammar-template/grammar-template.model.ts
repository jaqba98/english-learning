import { TextType } from '../../misc/text/text.type';

interface TextModel {
  kind: 'text',
  value: string;
  textType: TextType;
}

interface MultilineTextModel {
  kind: 'multiline-text',
  lines: string[];
}

interface HeaderModel {
  kind: 'header',
  value: string;
  textType: TextType;
  link: string;
}

interface ListModel {
  kind: 'list',
  items: string[];
}

interface SentenceStructureModel {
  kind: 'sentence-structure',
  items: string[];
}

type TemplateLineType =
  | TextModel
  | MultilineTextModel
  | HeaderModel
  | ListModel
  | SentenceStructureModel;

export interface GrammarTemplateModel {
  lines: TemplateLineType[];
}
