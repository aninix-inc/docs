import classNames from 'classnames'
import * as R from 'ramda'
import * as React from 'react'
import schema from '../open-api/schema.json'

type BaseType = {
  enum?: string[] | number[]
  description?: string
  example?: string
}

type StringType = BaseType & {
  type: 'string'
}

type NumberType = BaseType & {
  type: 'number'
}

type BooleanType = BaseType & {
  type: 'boolean'
}

type RefType = BaseType & {
  $ref: string
}

type ObjectType = {
  type: 'object'
  description?: string
  example?: string
  properties?: Record<string, MainType>
  required?: string[]
}

type MainType = StringType | NumberType | BooleanType | RefType | ObjectType

const Leaf: React.FC<{
  schema: ObjectType
  id: string
  type: MainType
  parent: ObjectType
}> = ({ schema, id, type, parent }) => {
  if (Object.hasOwn(type, '$ref')) {
    const typedType = type as RefType
    const path = R.drop(1, typedType.$ref.split('/'))
    const objectAtPath = R.path(path, schema) as ObjectType
    return (
      <ObjectReference
        id={R.last(path)}
        schema={schema}
        object={objectAtPath}
      />
    )
  }

  if (Object.hasOwn(type, 'type')) {
    const typedType = type as StringType | NumberType | BooleanType | ObjectType

    switch (typedType.type) {
      case 'boolean':
      case 'string':
      case 'number': {
        // return (
        //   <div>
        //     PrimitiveType [{id}]: {JSON.stringify(typedType)}
        //   </div>
        // )
        return (
          <div>
            <p className="!m-0">
              <span className="font-bold">{id}</span>: {typedType.type}
              {!parent?.required?.includes(id) && (
                <span className="ml-2 px-2 border-[1px] py-1 text-[10px] font-bold rounded-full">
                  Optional
                </span>
              )}
              {typedType.enum != null && typedType.enum.length === 1 && (
                <span className="block">
                  constant:
                  <span className="ml-2 bg-green-700 px-[6px] py-[5px] rounded text-xs text-white font-bold">
                    {typedType.enum[0]}
                  </span>
                </span>
              )}
            </p>

            <p className="!m-0 italic">{typedType.description}</p>
          </div>
        )
      }

      case 'object': {
        if (typedType.properties == null) {
          return (
            <div>
              <p className="!m-0">
                <span className="font-bold">{id}</span>: {typedType.type}
                {parent?.required?.includes(id) && (
                  <span className="ml-2 bg-green-700 px-[6px] py-[5px] rounded text-xs text-white font-bold">
                    Required
                  </span>
                )}
              </p>

              <p className="!m-0 italic">{typedType.description}</p>
            </div>
          )
        }

        return <ObjectReference schema={schema} id={id} object={typedType} />
      }

      default: {
        const never: never = typedType
        return <p>`Not supported yet "${never}"`</p>
      }
    }
  }
}

type Props = {
  schema?: any
  id?: string
  object?: ObjectType
  className?: string
}
export const ObjectReference: React.FC<
  Props & { children?: React.ReactNode }
> = ({
  schema: localSchema = schema,
  id: providedId,
  object: providedObject,
  className,
  children,
}) => {
  const id = providedId ?? 'RenderJobCancelledEvent'
  const object = providedObject ?? localSchema.components.schemas[id]

  return (
    <details
      key={id}
      className={classNames(
        'relative border-[1px] border-gray-200 rounded-xl p-4 outline-none bg-transparent w-full text-left',
        className
      )}
    >
      <summary className="w-fit font-bold bg-yellow-700 px-[6px] py-[5px] rounded text-xs text-white cursor-pointer">
        {id}
      </summary>

      {Object.entries(object.properties).map(([key, value]) => (
        <Leaf
          key={key}
          schema={localSchema}
          id={key}
          // @ts-ignore
          type={value}
          parent={object}
        />
      ))}

      {children}
    </details>
  )
}
