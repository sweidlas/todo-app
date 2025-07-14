import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UPDATE_USER_EMAIL_MUTATION } from 'src/app/shared/graphql/mutations/update_user_email';
import { UPDATE_USER_PASSWORD_MUTATION } from 'src/app/shared/graphql/mutations/update_user_password';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CreateTodoInput, Priority } from 'src/generated/graphql';
import { TodoService } from '../../todo/todo.service';
import { ChangeEmailComponent } from '../change-email/change-email.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';

export type userSettings = {
  rotatingAnimation: boolean;
  backgroundImage: string;
};

@Component({
  selector: 'app-settings',
  imports: [CommonModule, ChangePasswordComponent, ChangeEmailComponent],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  authService = inject(AuthService);
  apiService = inject(ApiService);
  router = inject(Router);
  todoService = inject(TodoService);

  showChangePasswordOverlay = false;
  showChangeEmailOverlay = false;

  bulkTodos: CreateTodoInput[] = [
    {
      title:
        'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      description:
        'Consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
      completed: false,
      priority: Priority.High,
      color: 'bg-yellow-400',
    },
    {
      title:
        'Sed ut perspiciatis unde omnis Sed ut perspiciatis unde omnis Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque',
      description:
        'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit',
      completed: true,
      priority: Priority.Medium,
      color: 'bg-orange-400',
    },
    {
      title:
        'At vero eos et accusamus At vero eos et accusamus At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti',
      description:
        'Et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti Et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti Et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident similique sunt in culpa qui officia deserunt mollitia animi id est laborum et dolorum fuga',
      completed: false,
      priority: Priority.Low,
      color: 'bg-red-400',
    },
    {
      title:
        'Temporibus autem quibusdam Temporibus autem quibusdam Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae',
      description:
        'Et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae Et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae Et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat',
      completed: false,
      priority: Priority.High,
      color: 'bg-green-400',
    },
    {
      title:
        'Nam libero tempore cum soluta Nam libero tempore cum soluta Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere',
      description:
        'Nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus Nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus Nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus omnis voluptas assumenda est omnis dolor repellendus temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae',
      completed: true,
      priority: Priority.Medium,
      color: 'bg-pink-400',
    },
    {
      title:
        'Excepteur sint occaecat cupidatat Excepteur sint occaecat cupidatat Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollitia animi',
      description:
        'Non proident sunt in culpa qui officia deserunt mollitia animi Non proident sunt in culpa qui officia deserunt mollitia animi Non proident sunt in culpa qui officia deserunt mollitia animi id est laborum et dolorum fuga et harum quidem rerum facilis est et expedita distinctio nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus omnis voluptas assumenda est omnis dolor repellendus',
      completed: false,
      priority: Priority.Low,
      color: 'bg-blue-400',
    },
    {
      title:
        'Duis aute irure dolor in Duis aute irure dolor in Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat',
      description:
        'Reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollitia animi id est laborum et dolorum fuga et harum quidem rerum facilis est et expedita distinctio nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus',
      completed: true,
      priority: Priority.High,
      color: 'bg-yellow-400',
    },
    {
      title:
        'Ut enim ad minima veniam Ut enim ad minima veniam Ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi',
      description:
        'Quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi Quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi Quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum qui dolorem eum fugiat quo voluptas nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollitia animi',
      completed: false,
      priority: Priority.Medium,
      color: 'bg-orange-400',
    },
    {
      title:
        'Quis autem vel eum iure Quis autem vel eum iure Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum qui dolorem eum',
      description:
        'Reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur Reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur Reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum qui dolorem eum fugiat quo voluptas nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollitia animi id est laborum et dolorum fuga et harum quidem rerum facilis est et expedita distinctio nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus',
      completed: false,
      priority: Priority.Low,
      color: 'bg-red-400',
    },
    {
      title:
        'Neque porro quisquam est Neque porro quisquam est Neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia non numquam eius modi tempora incidunt',
      description:
        'Qui dolorem ipsum quia dolor sit amet consectetur adipisci velit Qui dolorem ipsum quia dolor sit amet consectetur adipisci velit Qui dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum qui dolorem eum fugiat quo voluptas nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollitia animi',
      completed: true,
      priority: Priority.High,
      color: 'bg-green-400',
    },
    {
      title:
        'Ut aliquip ex ea commodo Ut aliquip ex ea commodo Ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat',
      description:
        'Consequat duis aute irure dolor in reprehenderit in voluptate velit esse Consequat duis aute irure dolor in reprehenderit in voluptate velit esse Consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollitia animi id est laborum et dolorum fuga et harum quidem rerum facilis est et expedita distinctio nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus',
      completed: false,
      priority: Priority.Medium,
      color: 'bg-pink-400',
    },
    {
      title:
        'Sed quia non numquam eius Sed quia non numquam eius Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem ut enim ad minima veniam',
      description:
        'Modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem Modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem Modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum qui dolorem eum fugiat quo voluptas nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollitia animi',
      completed: false,
      priority: Priority.Low,
      color: 'bg-blue-400',
    },
    {
      title:
        'Vel illum qui dolorem Vel illum qui dolorem Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur at vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis',
      description:
        'Eum fugiat quo voluptas nulla pariatur at vero eos et accusamus Eum fugiat quo voluptas nulla pariatur at vero eos et accusamus Eum fugiat quo voluptas nulla pariatur at vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident similique sunt in culpa qui officia deserunt mollitia animi id est laborum et dolorum fuga et harum quidem rerum facilis est et expedita distinctio nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus',
      completed: true,
      priority: Priority.High,
      color: 'bg-yellow-400',
    },
    {
      title: 'Totam rem aperiam eaque',
      description: 'Ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt',
      completed: false,
      priority: Priority.Medium,
      color: 'bg-orange-400',
    },
    {
      title: 'Explicabo nemo enim ipsam',
      description: 'Voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur',
      completed: false,
      priority: Priority.Low,
      color: 'bg-red-400',
    },
    {
      title: 'Magni dolores eos qui ratione',
      description: 'Voluptatem sequi nesciunt neque porro quisquam est qui dolorem ipsum',
      completed: true,
      priority: Priority.High,
      color: 'bg-green-400',
    },
    {
      title: 'Vel eum iure reprehenderit',
      description: 'Qui in ea voluptate velit esse quam nihil molestiae consequatur',
      completed: false,
      priority: Priority.Medium,
      color: 'bg-pink-400',
    },
    {
      title: 'Dolorem ipsum quia dolor',
      description: 'Sit amet consectetur adipisci velit sed quia non numquam eius modi',
      completed: false,
      priority: Priority.Low,
      color: 'bg-blue-400',
    },
    {
      title: 'Tempora incidunt ut labore',
      description: 'Et dolore magnam aliquam quaerat voluptatem ut enim ad minima veniam',
      completed: true,
      priority: Priority.High,
      color: 'bg-yellow-400',
    },
    {
      title: 'Quis nostrum exercitationem',
      description: 'Ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur',
      completed: false,
      priority: Priority.Medium,
      color: 'bg-orange-400',
    },
    {
      title: 'Eaque ipsa quae ab',
      description: 'Illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo',
      completed: false,
      priority: Priority.Low,
      color: 'bg-red-400',
    },
    {
      title: 'Nemo enim ipsam voluptatem',
      description: 'Quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni',
      completed: true,
      priority: Priority.High,
      color: 'bg-green-400',
    },
    {
      title: 'Aspernatur aut odit aut',
      description: 'Fugit sed quia consequuntur magni dolores eos qui ratione voluptatem sequi',
      completed: false,
      priority: Priority.Medium,
      color: 'bg-pink-400',
    },
    {
      title: 'Consequuntur magni dolores',
      description: 'Eos qui ratione voluptatem sequi nesciunt neque porro quisquam est',
      completed: false,
      priority: Priority.Low,
      color: 'bg-blue-400',
    },
    {
      title: 'Ratione voluptatem sequi',
      description: 'Nesciunt neque porro quisquam est qui dolorem ipsum quia dolor sit amet',
      completed: true,
      priority: Priority.High,
      color: 'bg-pink-400',
    },
    {
      title: 'Nesciunt neque porro',
      description: 'Quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit',
      completed: false,
      priority: Priority.Medium,
      color: 'bg-blue-400',
    },
    {
      title: 'Quisquam est qui dolorem',
      description: 'Ipsum quia dolor sit amet consectetur adipisci velit sed quia non numquam',
      completed: false,
      priority: Priority.Low,
      color: 'bg-yellow-400',
    },
    {
      title: 'Ipsum quia dolor sit',
      description: 'Amet consectetur adipisci velit sed quia non numquam eius modi tempora incidunt',
      completed: true,
      priority: Priority.High,
      color: 'bg-orange-400',
    },
    {
      title: 'Amet consectetur adipisci',
      description: 'Velit sed quia non numquam eius modi tempora incidunt ut labore et dolore',
      completed: false,
      priority: Priority.Medium,
      color: 'bg-red-400',
    },
    {
      title: 'Velit sed quia non',
      description: 'Numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat',
      completed: false,
      priority: Priority.Low,
      color: 'bg-green-400',
    },
    {
      title: 'Numquam eius modi tempora',
      description: 'Incidunt ut labore et dolore magnam aliquam quaerat voluptatem ut enim ad',
      completed: true,
      priority: Priority.High,
      color: 'bg-pink-400',
    },
    {
      title: 'Incidunt ut labore et',
      description: 'Dolore magnam aliquam quaerat voluptatem ut enim ad minima veniam quis nostrum',
      completed: false,
      priority: Priority.Medium,
      color: 'bg-blue-400',
    },
    {
      title: 'Dolore magnam aliquam',
      description: 'Quaerat voluptatem ut enim ad minima veniam quis nostrum exercitationem ullam',
      completed: false,
      priority: Priority.Low,
      color: 'bg-yellow-400',
    },
    {
      title: 'Quaerat voluptatem ut',
      description: 'Enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit',
      completed: true,
      priority: Priority.High,
      color: 'bg-orange-400',
    },
    {
      title: 'Enim ad minima veniam',
      description: 'Quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid',
      completed: false,
      priority: Priority.Medium,
      color: 'bg-red-400',
    },
    {
      title: 'Quis nostrum exercitationem ullam',
      description: 'Corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur quis autem',
      completed: false,
      priority: Priority.Low,
      color: 'bg-green-400',
    },
    {
      title: 'Corporis suscipit laboriosam',
      description: 'Nisi ut aliquid ex ea commodi consequatur quis autem vel eum iure',
      completed: true,
      priority: Priority.High,
      color: 'bg-pink-400',
    },
    {
      title: 'Nisi ut aliquid ex',
      description: 'Ea commodi consequatur quis autem vel eum iure reprehenderit qui in ea',
      completed: false,
      priority: Priority.Medium,
      color: 'bg-blue-400',
    },
    {
      title: 'Ea commodi consequatur',
      description: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse',
      completed: false,
      priority: Priority.Low,
      color: 'bg-yellow-400',
    },
    {
      title: 'Quis autem vel eum',
      description: 'Iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae',
      completed: true,
      priority: Priority.High,
      color: 'bg-orange-400',
    },
    {
      title: 'Iure reprehenderit qui',
      description: 'In ea voluptate velit esse quam nihil molestiae consequatur vel illum qui',
      completed: false,
      priority: Priority.Medium,
      color: 'bg-red-400',
    },
    {
      title: 'In ea voluptate velit',
      description: 'Esse quam nihil molestiae consequatur vel illum qui dolorem eum fugiat quo',
      completed: false,
      priority: Priority.Low,
      color: 'bg-green-400',
    },
    {
      title: 'Esse quam nihil molestiae',
      description: 'Consequatur vel illum qui dolorem eum fugiat quo voluptas nulla pariatur',
      completed: true,
      priority: Priority.High,
      color: 'bg-pink-400',
    },
    {
      title: 'Consequatur vel illum',
      description: 'Qui dolorem eum fugiat quo voluptas nulla pariatur excepteur sint occaecat',
      completed: false,
      priority: Priority.Medium,
      color: 'bg-blue-400',
    },
    {
      title: 'Qui dolorem eum fugiat',
      description: 'Quo voluptas nulla pariatur excepteur sint occaecat cupidatat non proident',
      completed: false,
      priority: Priority.Low,
      color: 'bg-yellow-400',
    },
    {
      title: 'Quo voluptas nulla pariatur',
      description: 'Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia',
      completed: true,
      priority: Priority.High,
      color: 'bg-orange-400',
    },
    {
      title: 'Excepteur sint occaecat cupidatat',
      description: 'Non proident sunt in culpa qui officia deserunt mollitia animi id est',
      completed: false,
      priority: Priority.Medium,
      color: 'bg-red-400',
    },
    {
      title: 'Non proident sunt in',
      description: 'Culpa qui officia deserunt mollitia animi id est laborum et dolorum fuga',
      completed: false,
      priority: Priority.Low,
      color: 'bg-green-400',
    },
    {
      title: 'Culpa qui officia deserunt',
      description: 'Mollitia animi id est laborum et dolorum fuga et harum quidem rerum',
      completed: true,
      priority: Priority.High,
      color: 'bg-pink-400',
    },
    {
      title: 'Mollitia animi id est',
      description: 'Laborum et dolorum fuga et harum quidem rerum facilis est et expedita',
      completed: false,
      priority: Priority.Medium,
      color: 'bg-blue-400',
    },
    {
      title: 'Laborum et dolorum fuga',
      description: 'Et harum quidem rerum facilis est et expedita distinctio nam libero tempore',
      completed: false,
      priority: Priority.Low,
      color: 'bg-yellow-400',
    },
    {
      title: 'Et harum quidem rerum',
      description: 'Facilis est et expedita distinctio nam libero tempore cum soluta nobis est',
      completed: true,
      priority: Priority.High,
      color: 'bg-orange-400',
    },
    {
      title: 'Facilis est et expedita',
      description: 'Distinctio nam libero tempore cum soluta nobis est eligendi optio cumque',
      completed: false,
      priority: Priority.Medium,
      color: 'bg-red-400',
    },
    {
      title: 'Distinctio nam libero',
      description: 'Tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus',
      completed: false,
      priority: Priority.Low,
      color: 'bg-green-400',
    },
    {
      title: 'Tempore cum soluta nobis',
      description: 'Est eligendi optio cumque nihil impedit quo minus id quod maxime placeat',
      completed: true,
      priority: Priority.High,
      color: 'bg-pink-400',
    },
    {
      title: 'Est eligendi optio cumque',
      description: 'Nihil impedit quo minus id quod maxime placeat facere possimus omnis',
      completed: false,
      priority: Priority.Medium,
      color: 'bg-blue-400',
    },
    {
      title: 'Nihil impedit quo minus',
      description: 'Id quod maxime placeat facere possimus omnis voluptas assumenda est omnis',
      completed: false,
      priority: Priority.Low,
      color: 'bg-yellow-400',
    },
    {
      title: 'Id quod maxime placeat',
      description: 'Facere possimus omnis voluptas assumenda est omnis dolor repellendus',
      completed: true,
      priority: Priority.High,
      color: 'bg-orange-400',
    },
    {
      title: 'Facere possimus omnis',
      description: 'Voluptas assumenda est omnis dolor repellendus temporibus autem quibusdam',
      completed: false,
      priority: Priority.Medium,
      color: 'bg-red-400',
    },
    {
      title: 'Voluptas assumenda est',
      description: 'Omnis dolor repellendus temporibus autem quibusdam et aut officiis debitis',
      completed: false,
      priority: Priority.Low,
      color: 'bg-green-400',
    },
    {
      title: 'Omnis dolor repellendus',
      description: 'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus',
      completed: true,
      priority: Priority.High,
      color: 'bg-pink-400',
    },
    {
      title: 'Temporibus autem quibusdam et',
      description: 'Aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates',
      completed: false,
      priority: Priority.Medium,
      color: 'bg-blue-400',
    },
    {
      title: 'Aut officiis debitis aut',
      description: 'Rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et',
      completed: false,
      priority: Priority.Low,
      color: 'bg-yellow-400',
    },
    {
      title: 'Rerum necessitatibus saepe',
      description: 'Eveniet ut et voluptates repudiandae sint et molestiae non recusandae',
      completed: true,
      priority: Priority.High,
      color: 'bg-orange-400',
    },
    {
      title: 'Eveniet ut et voluptates',
      description: 'Repudiandae sint et molestiae non recusandae itaque earum rerum hic tenetur',
      completed: false,
      priority: Priority.Medium,
      color: 'bg-red-400',
    },
    {
      title: 'Repudiandae sint et',
      description: 'Molestiae non recusandae itaque earum rerum hic tenetur a sapiente delectus',
      completed: false,
      priority: Priority.Low,
      color: 'bg-green-400',
    },
    {
      title: 'Molestiae non recusandae',
      description: 'Itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis',
      completed: true,
      priority: Priority.High,
      color: 'bg-pink-400',
    },
    {
      title: 'Itaque earum rerum hic',
      description: 'Tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores alias',
      completed: false,
      priority: Priority.Medium,
      color: 'bg-blue-400',
    },
    {
      title: 'Tenetur a sapiente delectus',
      description: 'Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis',
      completed: false,
      priority: Priority.Low,
      color: 'bg-yellow-400',
    },
    {
      title: 'Ut aut reiciendis',
      description: 'Voluptatibus maiores alias consequatur aut perferendis doloribus asperiores',
      completed: true,
      priority: Priority.High,
      color: 'bg-orange-400',
    },
    {
      title: 'Voluptatibus maiores alias',
      description: 'Consequatur aut perferendis doloribus asperiores repellat lorem ipsum dolor',
      completed: false,
      priority: Priority.Medium,
      color: 'bg-red-400',
    },
    {
      title: 'Consequatur aut perferendis',
      description: 'Doloribus asperiores repellat lorem ipsum dolor sit amet consectetur',
      completed: false,
      priority: Priority.Low,
      color: 'bg-green-400',
    },
    {
      title: 'Doloribus asperiores repellat',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod',
      completed: true,
      priority: Priority.High,
      color: 'bg-pink-400',
    },
    {
      title: 'Lorem ipsum dolor sit',
      description: 'Amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore',
      completed: false,
      priority: Priority.Medium,
      color: 'bg-blue-400',
    },
    {
      title: 'Amet consectetur adipiscing',
      description: 'Elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      completed: false,
      priority: Priority.Low,
      color: 'bg-yellow-400',
    },
    {
      title: 'Elit sed do eiusmod',
      description: 'Tempor incididunt ut labore et dolore magna aliqua ut enim ad minim',
      completed: true,
      priority: Priority.High,
      color: 'bg-orange-400',
    },
    {
      title: 'Tempor incididunt ut',
      description: 'Labore et dolore magna aliqua ut enim ad minim veniam quis nostrud',
      completed: false,
      priority: Priority.Medium,
      color: 'bg-red-400',
    },
    {
      title: 'Labore et dolore magna',
      description: 'Aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris',
      completed: false,
      priority: Priority.Low,
      color: 'bg-green-400',
    },
    {
      title: 'Aliqua ut enim ad',
      description: 'Minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex',
      completed: true,
      priority: Priority.High,
      color: 'bg-pink-400',
    },
    {
      title: 'Minim veniam quis nostrud',
      description: 'Exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis',
      completed: false,
      priority: Priority.Medium,
      color: 'bg-blue-400',
    },
    {
      title: 'Exercitation ullamco laboris',
      description: 'Nisi ut aliquip ex ea commodo consequat duis aute irure dolor in',
      completed: false,
      priority: Priority.Low,
      color: 'bg-yellow-400',
    },
    {
      title: 'Nisi ut aliquip ex',
      description: 'Ea commodo consequat duis aute irure dolor in reprehenderit in voluptate',
      completed: true,
      priority: Priority.High,
      color: 'bg-orange-400',
    },
    {
      title: 'Ea commodo consequat duis',
      description: 'Aute irure dolor in reprehenderit in voluptate velit esse cillum dolore',
      completed: false,
      priority: Priority.Medium,
      color: 'bg-red-400',
    },
    {
      title: 'Aute irure dolor in',
      description: 'Reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
      completed: false,
      priority: Priority.Low,
      color: 'bg-green-400',
    },
    {
      title: 'Reprehenderit in voluptate',
      description: 'Velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat',
      completed: true,
      priority: Priority.High,
      color: 'bg-pink-400',
    },
    {
      title: 'Velit esse cillum dolore',
      description: 'Eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident',
      completed: false,
      priority: Priority.Medium,
      color: 'bg-blue-400',
    },
    {
      title: 'Eu fugiat nulla pariatur',
      description: 'Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia',
      completed: false,
      priority: Priority.Low,
      color: 'bg-yellow-400',
    },
    {
      title: 'Excepteur sint occaecat',
      description: 'Cupidatat non proident sunt in culpa qui officia deserunt mollitia animi',
      completed: true,
      priority: Priority.High,
      color: 'bg-orange-400',
    },
    {
      title: 'Cupidatat non proident',
      description: 'Sunt in culpa qui officia deserunt mollitia animi id est laborum et',
      completed: false,
      priority: Priority.Medium,
      color: 'bg-red-400',
    },
    {
      title: 'Sunt in culpa qui',
      description: 'Officia deserunt mollitia animi id est laborum et dolorum fuga et harum',
      completed: false,
      priority: Priority.Low,
      color: 'bg-green-400',
    },
    {
      title:
        'Officia deserunt mollitia Officia deserunt mollitia Officia deserunt mollitia animi id est laborum et dolorum fuga et harum quidem rerum facilis est et expedita distinctio nam libero tempore cum soluta nobis',
      description:
        'Animi id est laborum et dolorum fuga et harum quidem rerum facilis Animi id est laborum et dolorum fuga et harum quidem rerum facilis Animi id est laborum et dolorum fuga et harum quidem rerum facilis est et expedita distinctio nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus omnis voluptas assumenda est omnis dolor repellendus temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat',
      completed: true,
      priority: Priority.High,
      color: 'bg-pink-400',
    },
    {
      title:
        'Animi id est laborum Animi id est laborum Animi id est laborum et dolorum fuga et harum quidem rerum facilis est et expedita distinctio nam libero tempore cum soluta nobis est eligendi optio cumque',
      description:
        'Et dolorum fuga et harum quidem rerum facilis est et expedita distinctio Et dolorum fuga et harum quidem rerum facilis est et expedita distinctio Et dolorum fuga et harum quidem rerum facilis est et expedita distinctio nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus omnis voluptas assumenda est omnis dolor repellendus temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat',
      completed: false,
      priority: Priority.Medium,
      color: 'bg-blue-400',
    },
    {
      title:
        'Et dolorum fuga et Et dolorum fuga et Et dolorum fuga et harum quidem rerum facilis est et expedita distinctio nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus',
      description:
        'Harum quidem rerum facilis est et expedita distinctio nam libero tempore Harum quidem rerum facilis est et expedita distinctio nam libero tempore Harum quidem rerum facilis est et expedita distinctio nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus omnis voluptas assumenda est omnis dolor repellendus temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat',
      completed: false,
      priority: Priority.Low,
      color: 'bg-yellow-400',
    },
    {
      title:
        'Harum quidem rerum facilis Harum quidem rerum facilis Harum quidem rerum facilis est et expedita distinctio nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime',
      description:
        'Est et expedita distinctio nam libero tempore cum soluta nobis est eligendi Est et expedita distinctio nam libero tempore cum soluta nobis est eligendi Est et expedita distinctio nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus omnis voluptas assumenda est omnis dolor repellendus temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat',
      completed: true,
      priority: Priority.High,
      color: 'bg-orange-400',
    },
    {
      title:
        'Est et expedita distinctio Est et expedita distinctio Est et expedita distinctio nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus',
      description:
        'Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus omnis voluptas assumenda est omnis dolor repellendus temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat',
      completed: false,
      priority: Priority.Medium,
      color: 'bg-red-400',
    },
    {
      title:
        'Nam libero tempore cum Nam libero tempore cum Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus omnis voluptas assumenda',
      description:
        'Soluta nobis est eligendi optio cumque nihil impedit quo minus id quod Soluta nobis est eligendi optio cumque nihil impedit quo minus id quod Soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus omnis voluptas assumenda est omnis dolor repellendus temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat',
      completed: false,
      priority: Priority.Low,
      color: 'bg-green-400',
    },
    {
      title:
        'Soluta nobis est eligendi Soluta nobis est eligendi Soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus omnis voluptas assumenda est omnis dolor',
      description:
        'Optio cumque nihil impedit quo minus id quod maxime placeat facere possimus Optio cumque nihil impedit quo minus id quod maxime placeat facere possimus Optio cumque nihil impedit quo minus id quod maxime placeat facere possimus omnis voluptas assumenda est omnis dolor repellendus temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat',
      completed: true,
      priority: Priority.High,
      color: 'bg-pink-400',
    },
    {
      title:
        'Optio cumque nihil impedit Optio cumque nihil impedit Optio cumque nihil impedit quo minus id quod maxime placeat facere possimus omnis voluptas assumenda est omnis dolor repellendus temporibus autem',
      description:
        'Quo minus id quod maxime placeat facere possimus omnis voluptas assumenda Quo minus id quod maxime placeat facere possimus omnis voluptas assumenda Quo minus id quod maxime placeat facere possimus omnis voluptas assumenda est omnis dolor repellendus temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat',
      completed: false,
      priority: Priority.Medium,
      color: 'bg-blue-400',
    },
    {
      title:
        'Quo minus id quod Quo minus id quod Quo minus id quod maxime placeat facere possimus omnis voluptas assumenda est omnis dolor repellendus temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus',
      description:
        'Maxime placeat facere possimus omnis voluptas assumenda est omnis dolor Maxime placeat facere possimus omnis voluptas assumenda est omnis dolor Maxime placeat facere possimus omnis voluptas assumenda est omnis dolor repellendus temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat',
      completed: false,
      priority: Priority.Low,
      color: 'bg-yellow-400',
    },
    {
      title:
        'Maxime placeat facere possimus Maxime placeat facere possimus Maxime placeat facere possimus omnis voluptas assumenda est omnis dolor repellendus temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet',
      description:
        'Omnis voluptas assumenda est omnis dolor repellendus temporibus autem Omnis voluptas assumenda est omnis dolor repellendus temporibus autem Omnis voluptas assumenda est omnis dolor repellendus temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat',
      completed: true,
      priority: Priority.High,
      color: 'bg-orange-400',
    },
    {
      title:
        'Omnis voluptas assumenda Omnis voluptas assumenda Omnis voluptas assumenda est omnis dolor repellendus temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae',
      description:
        'Est omnis dolor repellendus temporibus autem quibusdam et aut officiis Est omnis dolor repellendus temporibus autem quibusdam et aut officiis Est omnis dolor repellendus temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat',
      completed: false,
      priority: Priority.Medium,
      color: 'bg-red-400',
    },
    {
      title:
        'Est omnis dolor repellendus Est omnis dolor repellendus Est omnis dolor repellendus temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae',
      description:
        'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat',
      completed: false,
      priority: Priority.Low,
      color: 'bg-green-400',
    },
    {
      title:
        'Temporibus autem quibusdam Temporibus autem quibusdam Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae itaque earum rerum',
      description:
        'Et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et Et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et Et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
      completed: true,
      priority: Priority.High,
      color: 'bg-pink-400',
    },
  ];

  logout() {
    this.authService.logout();
  }

  createBulkTodos() {
    this.bulkTodos.forEach((todo) => {
      this.todoService.createTodo(todo as any);
    });
  }

  onPasswordChanged(event: { oldPassword: string; newPassword: string }) {
    this.changePassword(event.oldPassword, event.newPassword);
    this.showChangePasswordOverlay = false;
  }

  onEmailChanged(event: { email: string }) {
    this.changeEmailAddress(event.email);
    this.showChangeEmailOverlay = false;
  }

  changePassword(oldPassword: string, newPassword: string) {
    this.apiService
      .mutate({ mutation: UPDATE_USER_PASSWORD_MUTATION, variables: { oldPassword, newPassword } })
      .subscribe((result) => {
        console.log('change Password', result);
      });
  }

  changeEmailAddress(emailAddress: string) {
    console.log('change Email', emailAddress);
    this.apiService
      .mutate({ mutation: UPDATE_USER_EMAIL_MUTATION, variables: { email: emailAddress } })
      .subscribe((result) => {
        console.log('change Password', result);
      });
  }
}
