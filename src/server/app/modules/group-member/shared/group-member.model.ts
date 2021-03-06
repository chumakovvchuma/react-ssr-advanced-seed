// Library
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn
} from 'typeorm';
import { IsInt, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

// Model
import { GroupModel } from '../../group/shared/group.model';
import { ProfileModel } from '../../profile/shared/profile.model';

export interface IGroupMember {
	id?: number;
	// -- AutoGenerated Model Interface --
	memberId: number;
	member?: ProfileModel;
	group?: GroupModel;
	groupId: number;
	date: Date;
}

@Entity('groupMember')
export class GroupMemberModel implements IGroupMember {
	@PrimaryGeneratedColumn()
	@ApiModelProperty()
	@IsInt()
	id: number;

	// -- Autogenerated Model Definition --
	@Column('int')
	@ApiModelProperty()
	@IsInt()
	memberId: number;

	@ManyToOne(type => ProfileModel, profile => profile.id, {
		eager: true,
		cascade: false
	})
	@JoinColumn({ name: 'memberId', referencedColumnName: 'id' })
	member: ProfileModel;

	@Column('int')
	@ApiModelProperty()
	@IsInt()
	groupId: number;

	@ManyToOne(type => GroupModel, group => group.id, {
		cascade: false,
		eager: false
	})
	group: GroupModel;

	@Column('text')
	@ApiModelProperty()
	@IsString()
	date: Date;
}