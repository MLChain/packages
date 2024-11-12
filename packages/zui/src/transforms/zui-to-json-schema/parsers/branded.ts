import { ZodBrandedDef } from '../../../z/index'
import { parseDef } from '../parseDef'
import { Refs } from '../Refs'

export function parseBrandedDef(_def: ZodBrandedDef<any>, refs: Refs) {
  return parseDef(_def.type._def, refs)
}
