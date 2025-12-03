import { BaseValidator } from "./BaseValidator";
import { Event } from "../entities/Event";

export class EventUpdateValidator extends BaseValidator<Event> {
  constructor(event: Event) {
    super(event);
  }

  public async validateWithCustomRules(): Promise<void> {
    await this.validate();
    
    if (this.entity.startTime && !/^\d{2}:\d{2}(:\d{2})?$/.test(this.entity.startTime)) {
      if (this.entity.startTime.length > 5) {
         this.entity.startTime = this.entity.startTime.substring(0, 5);
      } else {
         this.addError("startTime", "startTime must be HH:MM");
      }
    }

    if (this.entity.endTime && !/^\d{2}:\d{2}(:\d{2})?$/.test(this.entity.endTime)) {
       if (this.entity.endTime.length > 5) {
          this.entity.endTime = this.entity.endTime.substring(0, 5);
       } else {
          this.addError("endTime", "endTime must be HH:MM");
       }
    }

    if (this.hasErrors()) {
      throw {
        http_status: 422,
        validations: this.getFormattedErrors(),
      };
    }
  }

  private addError(property: string, message: string) {
    this.listErrors.push({
      property,
      constraints: { custom: message },
      children: [],
      target: this.entity,
      value: (this.entity as any)[property],
    });
  }
}