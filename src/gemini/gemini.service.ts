import { GoogleGenerativeAI } from "@google/generative-ai";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { CharacterRepository } from "src/characters/character.repository";
import { Character } from "src/characters/schema/character.schema";

@Injectable()
export class GeminiService {
  protected readonly genAI: GoogleGenerativeAI;

  constructor(
    private readonly configService: ConfigService,
    protected readonly characterRepository: CharacterRepository,
  ) {
    const geminiApiKey = this.configService.get<string>('GEMINI_API_KEY');
    this.genAI = new GoogleGenerativeAI(geminiApiKey);
  }
  
  async generateContentWithGemini(modelName: string, prompt: string): Promise<string>{
    const model = this.genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
  }

  async createBackground(id: string): Promise<string> {
    const character = await this.characterRepository.findById(id);
    const prompt = `Escreva uma história de background para o personagem ${character.name}, ${character.race} e ${character.alignment} usando como base o jogo Dungeon and Dragons com no máximo 5000 caracteres`;
    return this.generateContentWithGemini("gemini-1.5-flash", prompt);
  }
  
  async createAdventure(characters: Character[]): Promise<string> {
    const characterDescriptions = characters.map(character => `${character.name}, um ${character.race} de classe ${character.class}, ${character?.subrace}
                      alinhamento ${character.alignment} e nível ${character.level}`).join('; ');
    const prompt = `Gere uma aventura em português para um grupo de personagens no jogo Dungeon and Dragons: ${characterDescriptions}.`;
    return this.generateContentWithGemini("gemini-1.5-flash", prompt);
  }
}
